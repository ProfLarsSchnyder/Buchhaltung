/* Run: node --test tests/bookit-cases.test.cjs (no npm dependencies). */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'fallstudie.html'),'utf8');
const data=fs.readFileSync(path.join(root,'fallstudien-data.js'),'utf8');
const scriptMatch=html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(scriptMatch,'BOOKIT inline JavaScript required');
const script=scriptMatch[1].replace("el('reset-entire-case').addEventListener('click',resetEntireCase);",'').replace('initAmountToolbar();','').replace(/\nrender\(\);\s*$/,'');
const worlds=['Fussball','Mode','Gaming','Gastronomie','Autos','Fitness','Reisen','Beauty','Musik'];
function boot(world,id,legacyDraft=null){
 const storage={};
 if(legacyDraft)storage['bookit-draft-v5-'+world]=JSON.stringify(legacyDraft);
 const status={textContent:''};
 const context=vm.createContext({
  window:{},URLSearchParams,Intl,
  location:{search:'?welt='+world+'&case='+id},
  localStorage:{getItem:k=>storage[k]??null,setItem:(k,v)=>storage[k]=v,removeItem:k=>delete storage[k]},
  document:{addEventListener(){},getElementById:id=>['ledger-notice','transfer-status'].includes(id)?status:null},
  confirm:()=>true
 });
 vm.runInContext(data,context,{filename:'fallstudien-data.js'});
 vm.runInContext(script,context,{filename:'fallstudie.html'});
 return {context,storage};
}
const run=(context,source)=>JSON.parse(JSON.stringify(vm.runInContext(source,context)));
for(const world of worlds)for(const id of ['grundlagen','verlust','challenge']){
 test(world+' · '+id+' is balanced in all three statements',()=>{
  const {context}=boot(world,id);
  const result=run(context,"(()=>{ const result={id:caseId,len:source.transactions.length,accounts:accounts.length,profit,errors:{}};for(const p of ['op','er','bs']){ const req=sheetDef[p].required();dynamicSheetRows[p]={left:Object.entries(req.left).filter(([a,v])=>v!==0).map(([account,amount])=>({account,amount:String(amount)})),right:Object.entries(req.right).filter(([a,v])=>v!==0).map(([account,amount])=>({account,amount:String(amount)}))};const state=sheetStoredState(p);state.total0=state.total1=String(sheetsTotal(p));result.errors[p]=checkDynamicSheet(p)} result.difference=assets.reduce((v,a)=>v+signed(a),0)-accounts.filter(a=>['liability','equity'].includes(categories[a])).reduce((v,a)=>v-signed(a),0)-profit;return result;})()");
  assert.deepEqual(result.errors,{op:[],er:[],bs:[]});
  assert.equal(result.difference,0);
  assert.equal(result.id,id);
  assert.equal(result.len,id==='grundlagen'?7:id==='verlust'?9:14);
  assert.equal(result.accounts,id==='challenge'?11:8);
  if(id==='verlust')assert.ok(result.profit<0);
 });
}
test('unsorted opening accounts accepted; wrong amounts never disclose solution',()=>{
 const {context}=boot('Gaming','challenge');
 const r=run(context,"(()=>{dynamicSheetRows.op.left=Object.entries(source.opening).filter(([a])=>categories[a]==='asset').reverse().map(([account,amount])=>({account,amount:String(amount)}));dynamicSheetRows.op.right=[{account:'Eigenkapital',amount:String(source.opening.Eigenkapital)}];openingAnswers.total0=openingAnswers.total1=String(sheetsTotal('op'));const accepted=checkDynamicSheet('op');dynamicSheetRows.op.left[0].amount='1';return {accepted,wrong:checkDynamicSheet('op')};})()");
 assert.deepEqual(r.accepted,[]);
 assert.equal(r.wrong.length,1);
 assert.match(r.wrong[0],/Betrag.*prüfen/);
});
test('locked account AB cannot be overwritten by auto transfer',()=>{
 const {context}=boot('Fussball','grundlagen');
 const r=run(context,"(()=>{ledgerPreferences.ab=true;dynamicSheetRows.op.left=[{account:'Bank',amount:'1234'},{account:'Mobiliar',amount:'300'}];dynamicSheetRows.op.right=[{account:'Eigenkapital',amount:'1534'}];openedAccounts=['Bank'];lockedAccounts.Bank=true;ensureLedger('Bank').debit.ab='999';render=()=>{};runLedgerTransfers();return {bank:ensureLedger('Bank').debit.ab,mob:ensureLedger('Mobiliar').debit.ab};})()");
 assert.equal(r.bank,'999');
 assert.equal(r.mob,'300');
});
test('income import reveals neither profit/loss side nor totals',()=>{
 for(const id of ['grundlagen','verlust']){
  const {context}=boot('Gaming',id);
  const r=run(context,"(()=>{for(const a of accounts){openedAccounts.push(a);const ledger=ensureLedger(a);ledger[['asset','expense'].includes(categories[a])?'credit':'debit'].eb=String(Math.abs(signed(a)));}render=()=>{};transferFinancialSheet('er');return {left:dynamicSheetRows.er.left,right:dynamicSheetRows.er.right,totals:[erAnswers.total0,erAnswers.total1]};})()");
  assert.ok(r.left.some(x=>x.account===''));
  assert.ok(r.right.some(x=>x.account===''));
  assert.ok(![...r.left,...r.right].some(x=>['Gewinn','Verlust'].includes(x.account)));
  assert.deepEqual(r.totals,['','']);
 }
});
test('legacy base-case progress is preserved',()=>{
 const {context}=boot('Fussball','grundlagen',{journal:[{debit:'Bank',credit:'Warenertrag',amount:'2'}],activityStats:{checks:4}});
 const r=run(context,"({draftKey,journal,checks:activityStats.checks})");
 assert.equal(r.draftKey,'bookit-draft-v5-Fussball');
 assert.equal(r.checks,4);
 assert.equal(r.journal[0].amount,'2');
});
