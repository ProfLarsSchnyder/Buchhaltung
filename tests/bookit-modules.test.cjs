/* BOOKIT: Modulsystem und Fragenkatalog. Lokal: node --test tests/bookit-modules.test.cjs */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const config=fs.readFileSync(path.join(root,'bookit-module-catalog.js'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script,'index.html needs executable inline script');
function boot(){
 const nodes=new Map();
 const element=(id)=>{
  if(!nodes.has(id))nodes.set(id,{
   id,innerHTML:'',textContent:'',value:'',className:'',disabled:false,
   addEventListener(){},querySelectorAll(){return []},
   classList:{add(){},remove(){},contains(){return true},toggle(){}}
  });
  return nodes.get(id);
 };
 const storage=new Map();
 const document={
  getElementById:element,addEventListener(){},querySelectorAll(){return []}
 };
 const context=vm.createContext({window:{},document,URLSearchParams,Intl,scrollTo(){},
  localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}
 });
 vm.runInContext(config,context,{filename:'bookit-module-catalog.js'});
 vm.runInContext(script,context,{filename:'index.html'});
 return context;
}
const read=(ctx,expression)=>JSON.parse(JSON.stringify(vm.runInContext(expression,ctx)));
test('exactly one active topic and five distinct activity areas',()=>{
 const c=boot();
 const result=read(c,'({topics:CATALOG.topics.map(t=>t.id),activities:CATALOG.activities.map(a=>a.id),exerciseTypes:TOPIC.exercises.map(x=>x.id)})');
 assert.deepEqual(result.topics,['doppelte-buchhaltung']);
 assert.deepEqual(result.activities,['lernen','trainieren','fallstudien','challenges','gemischt']);
 assert.deepEqual(result.exerciseTypes,['konten','bilanz','erfolg','bewegungen','buchungen']);
});
test('Swiss account catalog contains distinct accounts and each core category',()=>{
 const c=boot();
 const r=read(c,'CATALOG.accounts');
 assert.equal(r.length,22);
 assert.equal(new Set(r.map(a=>a.id)).size,r.length);
 assert.equal(new Set(r.map(a=>a.number)).size,r.length);
 assert.deepEqual([...new Set(r.map(a=>a.kind))].sort(),['Aktiv','Aufwand','Ertrag','Passiv']);
 assert.ok(r.every(a=>Number(a.number)>=1000&&Number(a.number)<7000));
 assert.ok(r.every(a=>a.level>=1&&a.level<=3));
 assert.ok(!r.some(a=>/MWST|Abschreibungen|Rechnungsabgrenzung/.test(a.id)));
});
test('later topics can be added to the registry without altering navigation',()=>{
 const c=boot();
 const r=read(c,'(()=>{CATALOG.topics.push({...TOPIC,id:"test-zukunft",title:"Zukunft",exercises:[{id:"buchungen",title:"Buchen",description:"Test"}]});const ok=selectTopic("test-zukunft");return {ok,id:TOPIC.id,exercise:M[0][0],length:M.length}})()');
 assert.deepEqual(r,{ok:true,id:'test-zukunft',exercise:'buchungen',length:1});
});
test('all 9 worlds × 3 difficulties × 7 exercise forms use meaningful account selections',()=>{
 const c=boot();
 const errors=[],count={};
 const result=read(c,'(()=>{const faults=[],report={};for(const w of W){world=w;for(const d of D){difficulty=d[0];for(const id of ["konten","bilanz","erfolg","bewegungen","buchungen","detective","mixed"]){module=id;const qs=buildQuestions();if(!qs.length)faults.push([w.id,d[0],id,"no questions"]);const keys=new Set();for(const q of qs){if(keys.has(q.id))faults.push([w.id,d[0],id,"duplicate "+q.id]);keys.add(q.id);if(!q.text||!q.hint)faults.push([w.id,d[0],id,"missing description"]);if(q.type==="entry"||q.type==="detective"){if(!accountByName.has(q.s)||!accountByName.has(q.h)||q.s===q.h||q.value<=0)faults.push([w.id,d[0],id,"invalid booking"])}if(q.type==="class"&&q.kind!==accountByName.get(q.account)?.kind)faults.push([w.id,d[0],id,"wrong account category"]);if(q.type==="movement"){const debitIncrease=["Aktiv","Aufwand"].includes(q.kind);const result=q.increase?(debitIncrease?"Soll":"Haben"):(debitIncrease?"Haben":"Soll");if(q.correct!==result)faults.push([w.id,d[0],id,"wrong T-account side"]);}}report[w.id+" / "+d[0]+" / "+id]=qs.length;}}}return {faults,report}})()');
 assert.deepEqual(result.faults,[],JSON.stringify(result.faults));
 assert.equal(Object.keys(result.report).length,189);
 assert.ok(result.report['Gaming / einfach / konten']<22,'easy exercises must not exhaust the account plan');
 assert.ok(result.report['Gaming / schwer / buchungen']<=12);
 assert.ok(result.report['Gaming / einfach / mixed']>=6);
});
test('account type groups stay relevant to exercise form',()=>{
 const c=boot();
 const result=read(c,'(()=>{world=W[3];difficulty="schwer";const result={};for(const id of ["bilanz","erfolg","konten"]){module=id;result[id]=buildQuestions().map(q=>q.kind)}return result})()');
 assert.ok(result.bilanz.every(k=>['Aktiv','Passiv'].includes(k)));
 assert.ok(result.erfolg.every(k=>['Aufwand','Ertrag'].includes(k)));
 assert.ok(result.konten.includes('Aktiv')&&result.konten.includes('Passiv')&&result.konten.includes('Aufwand')&&result.konten.includes('Ertrag'));
});
test('existing case links remain accessible with independent difficulty variants',()=>{
 const c=boot();
 const r=read(c,'(()=>{world=W[0];showCases();return {links:document.getElementById("case-grid").innerHTML,mods:CATALOG.caseVariants.map(x=>x.id)}})()');
 assert.deepEqual(r.mods,['grundlagen','verlust','challenge']);
 for(const id of r.mods)assert.ok(r.links.includes('case='+id));
 assert.ok(r.links.includes('welt=Fussball'));
});
