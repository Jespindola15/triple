/* Triple Pixel · juego completo (motor, dibujo, menús, torneos, online) */
'use strict';
/* =====================================================================
   DATA — equipos de la NBA, camisetas y jugadores (planteles a mitad de 2026; los pases cambian seguido)
   st = [velocidad, tiro (dobles), triples, defensa, rebote/salto]
   Sin logos: solo nombres y colores de cada equipo.
   ===================================================================== */
const SKIN=['#F3CBA5','#DDA77E','#B07A50','#7A4B2C'];
// pelo: n negro · c castaño · r castaño claro · b rubio · p colorado · g canoso · x pelado (se dibuja corto)
const HAIR={n:'#15100c',c:'#3a2415',r:'#7a4a22',b:'#c99a4a',p:'#a5482a',g:'#9a9a9a',x:'#15100c'};
// Camiseta: color principal, secundario, diseño, short, medias, número (+ opciones)
function K(p,s,pat,shorts,socks,num,o){return Object.assign({p,s,pat,sleeve:p,shorts,socks,num,collar:s===p?num:s},o||{});}
function lum(h){const v=parseInt(h.slice(1),16);return 0.3*(v>>16)+0.59*((v>>8)&255)+0.11*(v&255);}
function autoAlt(k){return{p:'#F4F4F2',s:k.p,pat:'solid',sleeve:'#F4F4F2',shorts:'#F4F4F2',socks:'#F4F4F2',num:k.p,collar:k.p};}
function J(n,num,st,skin,hair){return{n,num,st,skin:skin||0,hair:HAIR[hair||'n']};}
function G(n,num,refl,reach,kit,skin,hair){return{n,num,refl,reach,kit,skin:skin||0,hair:HAIR[hair||'n']};}
const NOGK=G('—',0,60,60,'#888888');
function T(cat,id,name,abbr,city,kit,players,alt){return{cat,id,name,abbr,city,kit,alt:alt||autoAlt(kit),gk:NOGK,players};}
// camiseta de básquet: musculosa del color del equipo, short igual, número del color secundario
const BK=(p,s,num,o)=>K(p,s,'solid',p,p,num||s,Object.assign({collar:s},o||{}));

const CATS=[
 {id:'este',name:'Conferencia Este'},
 {id:'oeste',name:'Conferencia Oeste'}
];

const TEAMS=[
 /* ---------------- ESTE ---------------- */
 T('este','bos','Celtics','BOS','Boston',BK('#007A33','#FFFFFF'),
  [J('J. Tatum',0,[82,90,86,84,84],3),J('J. Brown',7,[88,88,80,84,80],3),J('D. White',9,[80,82,86,88,70],0,'x'),J('P. Pritchard',11,[82,80,88,74,66],0,'c'),J('A. Simons',4,[86,82,88,68,62],3)]),
 T('este','nyk','Knicks','NYK','Nueva York',BK('#006BB6','#F58426'),
  [J('J. Brunson',11,[84,92,86,72,64],2),J('K. Towns',32,[72,88,88,74,90],2),J('M. Bridges',25,[82,84,84,86,72],3),J('OG Anunoby',8,[80,80,84,92,78],3),J('J. Hart',3,[82,76,74,84,88],3)]),
 T('este','phi','76ers','PHI','Filadelfia',BK('#006BB6','#ED174C',null,{collar:'#ED174C'}),
  [J('J. Embiid',21,[66,94,80,86,94],3),J('T. Maxey',0,[94,88,86,72,64],3),J('P. George',8,[80,86,86,84,74],3),J('VJ Edgecombe',77,[90,80,78,80,78],3),J('K. Oubre Jr.',9,[84,80,76,78,76],3)]),
 T('este','mil','Bucks','MIL','Milwaukee',BK('#00471B','#EEE1C6'),
  [J('G. Antetokounmpo',34,[90,94,66,88,96],3),J('K. Kuzma',18,[78,82,78,72,78],3),J('M. Turner',33,[66,80,82,90,88],3),J('B. Portis',9,[70,82,82,72,86],3),J('R. Rollins',13,[84,78,80,72,62],3)]),
 T('este','cle','Cavaliers','CLE','Cleveland',BK('#860038','#FDBB30'),
  [J('D. Mitchell',45,[90,90,86,76,66],3),J('E. Mobley',4,[78,86,74,94,90],3),J('J. Allen',31,[70,84,40,86,92],3),J('M. Strus',1,[78,78,86,74,70],0,'c'),J('S. Merrill',5,[76,74,88,66,58],0,'r')]),
 T('este','ind','Pacers','IND','Indianápolis',BK('#002D62','#FDBB30'),
  [J('T. Haliburton',0,[86,84,88,74,64],3),J('P. Siakam',43,[82,90,78,82,84],3),J('A. Nembhard',2,[82,80,80,84,66],3),J('B. Mathurin','00',[84,84,80,70,72],3),J('A. Nesmith',23,[82,76,86,84,70],3)]),
 T('este','orl','Magic','ORL','Orlando',BK('#0077C0','#C4CED4',null,{num:'#FFFFFF'}),
  [J('P. Banchero',5,[80,90,78,80,86],3),J('F. Wagner',22,[82,86,78,84,78],0,'r'),J('D. Bane',3,[80,86,88,80,72],3),J('J. Suggs',4,[86,76,80,92,68],3),J('W. Carter Jr.',34,[66,80,74,84,88],3)]),
 T('este','det','Pistons','DET','Detroit',BK('#1D42BA','#C8102E',null,{num:'#FFFFFF',collar:'#C8102E'}),
  [J('C. Cunningham',2,[84,90,82,82,80],3),J('J. Duren',0,[70,84,30,84,94],3),J('A. Thompson',9,[92,78,66,92,84],3),J('T. Harris',12,[74,84,78,74,76],3),J('D. Robinson',55,[74,70,90,66,60],0,'r')]),
 T('este','mia','Heat','MIA','Miami',BK('#98002E','#F9A01B',null,{num:'#FFFFFF',collar:'#F9A01B'}),
  [J('B. Adebayo',13,[78,84,66,94,90],3),J('T. Herro',14,[82,86,88,70,70],0,'r'),J('N. Powell',24,[84,84,86,74,66],3),J('A. Wiggins',22,[84,80,78,82,76],3),J('D. Mitchell',45,[86,72,78,88,60],3)]),
 T('este','atl','Hawks','ATL','Atlanta',BK('#C8102E','#FDB927',null,{num:'#FFFFFF'}),
  [J('J. Johnson',1,[86,86,78,84,88],3),J('D. Daniels',5,[86,76,74,96,74],0,'c'),J('K. Porziņģis',8,[64,88,84,86,88],0,'c'),J('N. Alexander-Walker',9,[82,78,84,84,66],3),J('CJ McCollum',3,[78,86,86,68,64],3)]),
 T('este','tor','Raptors','TOR','Toronto',BK('#CE1141','#111111',null,{num:'#FFFFFF'}),
  [J('S. Barnes',4,[82,86,76,88,86],3),J('B. Ingram',3,[78,88,82,74,76],3),J('RJ Barrett',9,[84,84,78,74,76],3),J('I. Quickley',5,[86,80,84,74,64],3),J('J. Poeltl',19,[64,82,30,84,90],0,'c')]),
 T('este','chi','Bulls','CHI','Chicago',BK('#CE1141','#111111',null,{num:'#FFFFFF'}),
  [J('J. Giddey',3,[80,82,76,74,84],0,'c'),J('C. White',0,[88,82,86,70,62],3),J('N. Vučević',9,[62,86,80,72,90],0,'c'),J('M. Buzelis',14,[84,80,78,80,82],3),J('P. Williams',44,[80,76,78,82,76],3)]),
 T('este','bkn','Nets','BKN','Brooklyn',BK('#111111','#FFFFFF'),
  [J('M. Porter Jr.',17,[78,86,86,70,80],3),J('C. Thomas',24,[82,88,82,62,62],3),J('N. Claxton',33,[76,76,30,88,86],3),J('E. Demin',8,[82,74,78,74,66],0,'b'),J('N. Clowney',21,[76,74,80,78,80],3)]),
 T('este','was','Wizards','WAS','Washington',BK('#002B5C','#E31837',null,{num:'#FFFFFF',collar:'#E31837'}),
  [J('T. Young',11,[86,86,86,60,58],3),J('A. Sarr',20,[74,80,74,90,86],3),J('B. Coulibaly',0,[90,76,76,88,76],3),J('K. George',18,[80,76,82,76,72],3),J('T. Johnson',12,[82,80,84,66,62],3)]),
 T('este','cha','Hornets','CHA','Charlotte',BK('#00788C','#1D1160',null,{num:'#FFFFFF',collar:'#1D1160'}),
  [J('L. Ball',1,[86,82,86,72,72],3),J('B. Miller',24,[82,84,86,78,74],3),J('M. Bridges',0,[82,84,80,74,82],3),J('K. Knueppel',7,[78,82,90,70,70],0,'r'),J('M. Diabaté',14,[78,74,30,82,90],3)]),

 /* ---------------- OESTE ---------------- */
 T('oeste','okc','Thunder','OKC','Oklahoma City',BK('#007AC1','#EF3B24',null,{num:'#FFFFFF',collar:'#EF3B24'}),
  [J('S. Gilgeous-Alexander',2,[90,96,86,88,74],3),J('J. Williams',8,[86,88,82,88,76],3),J('C. Holmgren',7,[74,86,82,94,88],0,'c'),J('L. Dort',5,[82,72,80,94,72],3),J('I. Hartenstein',55,[62,80,40,84,92],0,'c')]),
 T('oeste','den','Nuggets','DEN','Denver',BK('#0E2240','#FEC524'),
  [J('N. Jokić',15,[66,96,86,82,96],0,'c'),J('J. Murray',27,[82,88,88,72,66],3),J('A. Gordon',32,[82,84,78,84,82],3),J('C. Braun',0,[86,80,78,84,74],0,'b'),J('C. Johnson',23,[78,78,88,80,72],3)]),
 T('oeste','lal','Lakers','LAL','Los Ángeles',BK('#FDB927','#552583',null,{num:'#552583'}),
  [J('L. Dončić',77,[78,94,88,74,86],0,'c'),J('L. James',23,[82,92,82,82,84],3,'x'),J('A. Reaves',15,[82,84,86,72,66],0,'c'),J('D. Ayton',5,[68,86,40,80,92],3),J('R. Hachimura',28,[76,84,84,74,76],3)],
  {p:'#552583',s:'#FDB927',pat:'solid',sleeve:'#552583',shorts:'#552583',socks:'#552583',num:'#FDB927',collar:'#FDB927'}),
 T('oeste','gsw','Warriors','GSW','San Francisco',BK('#1D428A','#FFC72C'),
  [J('S. Curry',30,[86,90,98,72,66],2),J('J. Butler',10,[80,88,72,86,80],3),J('D. Green',23,[76,74,72,94,84],3),J('B. Podziemski',2,[80,78,84,78,80],0,'c'),J('M. Moody',4,[80,74,84,78,68],3)]),
 T('oeste','hou','Rockets','HOU','Houston',BK('#CE1141','#C4CED4',null,{num:'#FFFFFF'}),
  [J('K. Durant',7,[80,94,90,80,80],3),J('A. Şengün',28,[66,90,70,80,92],0,'n'),J('A. Thompson',1,[94,78,66,92,84],3),J('J. Smith Jr.',10,[78,80,82,86,84],3),J('F. VanVleet',5,[80,80,86,84,62],3)]),
 T('oeste','min','Timberwolves','MIN','Minneapolis',BK('#0C2340','#78BE20'),
  [J('A. Edwards',5,[92,90,88,82,78],3),J('J. Randle',30,[74,88,80,74,84],3),J('R. Gobert',27,[62,76,20,96,96],3),J('J. McDaniels',3,[82,76,78,92,76],3),J('D. DiVincenzo',0,[84,76,88,80,70],0,'c')]),
 T('oeste','sas','Spurs','SAS','San Antonio',BK('#111111','#C4CED4',null,{num:'#FFFFFF'}),
  [J('V. Wembanyama',1,[78,90,84,98,96],3),J('D. Fox',4,[96,86,80,76,62],3),J('S. Castle',5,[86,80,72,86,74],3),J('D. Harper',2,[86,82,80,74,68],3),J('D. Vassell',24,[80,80,86,78,68],3)]),
 T('oeste','dal','Mavericks','DAL','Dallas',BK('#00538C','#B8C4CA',null,{num:'#FFFFFF'}),
  [J('C. Flagg',32,[86,86,78,88,84],0,'c'),J('K. Irving',11,[86,94,90,72,62],3),J('K. Thompson',31,[74,80,90,72,66],2),J('P.J. Washington',25,[78,78,82,82,82],3),J('D. Lively II',2,[72,78,20,86,92],3)]),
 T('oeste','lac','Clippers','LAC','Los Ángeles',BK('#1D428A','#C8102E',null,{num:'#FFFFFF',collar:'#C8102E'}),
  [J('K. Leonard',2,[78,92,86,90,80],3),J('I. Zubac',40,[62,84,30,86,92],0,'c'),J('J. Collins',20,[78,84,80,74,84],3),J('K. Dunn',8,[80,70,80,92,68],3),J('D. Jones Jr.',55,[90,74,76,86,78],3)]),
 T('oeste','phx','Suns','PHX','Phoenix',BK('#1D1160','#E56020',null,{num:'#FFFFFF',collar:'#E56020'}),
  [J('D. Booker',1,[84,94,88,72,68],2),J('J. Green',4,[92,84,82,70,70],3),J('D. Brooks',3,[78,78,80,90,70],3),J('M. Williams',15,[66,82,30,84,92],3),J('G. Allen',8,[78,76,90,72,64],0,'b')]),
 T('oeste','mem','Grizzlies','MEM','Memphis',BK('#12173F','#5D76A9',null,{num:'#FFFFFF'}),
  [J('J. Morant',12,[96,88,76,70,78],3),J('J. Jackson Jr.',8,[76,84,82,94,84],3),J('Z. Edey',14,[56,84,20,84,96],0,'c'),J('S. Aldama',7,[74,80,84,76,82],0,'c'),J('J. Wells',0,[82,76,82,80,70],3)]),
 T('oeste','sac','Kings','SAC','Sacramento',BK('#5A2D81','#C4CED4',null,{num:'#FFFFFF'}),
  [J('D. Sabonis',11,[66,88,70,76,96],0,'c'),J('Z. LaVine',8,[88,88,86,66,70],3),J('D. DeRozan',10,[78,92,70,72,72],3),J('R. Westbrook',18,[92,80,66,76,82],3),J('K. Murray',13,[78,78,82,82,80],3)]),
 T('oeste','nop','Pelicans','NOP','Nueva Orleans',BK('#0C2340','#C8102E',null,{num:'#FFFFFF',collar:'#85714D'}),
  [J('Z. Williamson',1,[82,92,50,74,88],3),J('T. Murphy III',25,[82,84,88,78,74],0,'c'),J('D. Murray',5,[84,82,78,84,74],3),J('J. Poole',3,[86,82,84,62,58],3),J('D. Queen',22,[72,82,66,74,86],3)]),
 T('oeste','por','Trail Blazers','POR','Portland',BK('#111111','#E03A3E',null,{num:'#FFFFFF'}),
  [J('D. Avdija',8,[80,86,80,84,84],0,'c'),J('D. Lillard',0,[84,88,92,66,62],3),J('J. Holiday',5,[78,80,84,88,72],3),J('S. Sharpe',17,[92,82,80,72,78],3),J('D. Clingan',23,[60,78,40,90,94],0,'c')]),
 T('oeste','uta','Jazz','UTA','Salt Lake City',BK('#3E2680','#79A3DC',null,{num:'#FFFFFF'}),
  [J('L. Markkanen',23,[76,88,88,72,82],0,'b'),J('K. George',3,[84,82,84,68,64],3),J('W. Kessler',24,[64,78,20,92,94],0,'c'),J('A. Bailey',19,[84,82,80,74,76],3),J('I. Collier',13,[88,76,72,76,66],3)])
];
for(const t of TEAMS)if(!t.alt)t.alt=autoAlt(t.kit);
function teamOf(id){return TEAMS.find(t=>t.id===id)||TEAMS[0];}

/* =====================================================================
   SIM — básquet arcade (60 Hz, determinista salvo los tiros, que usan s.rnd)
   Cancha en metros: x a lo largo (el equipo 0 ataca el aro de la derecha), y a lo ancho, z altura.
   ===================================================================== */
const SIM=(()=>{
 const DT=1/60,PR=0.4,BR=0.13,KR=0.85,GRAV=9.8,HN=32,RIM_H=3.05,RIM_R=0.23,HOOP_OFF=1.58,BOARD_OFF=1.2,GD=1.5,BAR=3.9,RC=0;
 const FORMATS={1:{L:20,W:12,R3:5.4,G:1.8},2:{L:24,W:13.5,R3:6.0,G:1.8},3:{L:28,W:15,R3:6.75,G:1.8}};
 const SC=20; // reloj de posesión
 const PERF=[0.73,0.89]; // zona verde del medidor (tiro perfecto)
 const NOIN={mx:0,my:0,kick:false,lob:false,sprint:false,dive:false,slide:false,skill:false,pass:false,sx:0,sy:0};
 const clamp=(v,a,b)=>v<a?a:v>b?b:v;
 const sf=s=>clamp((s-75)/22,-1,1);
 function derive(st){const[v,t,tr,d,r]=st;return{maxSpd:6.1*(1+0.08*sf(v)),accel:11*(1+0.12*sf(v)),sh2:sf(t),sh3:sf(tr),def:sf(d),reb:sf(r),jump:3.7*(1+0.07*sf(r)),ctrl:sf((v+t)/2),mass:1+0.2*sf(r)};}
 const SIM_hx=(s,team)=>(team===0?1:-1)*(s.L/2-HOOP_OFF);
 const hoopX=(s,team)=>(team===0?1:-1)*(s.L/2-HOOP_OFF);
 function rnd(s){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296;}

 function createMatch(cfg){
  const f=FORMATS[cfg.format]||FORMATS[1];
  const s={fouls:cfg.freeKicks!==false,ft:null,ftAfter:null,styles:cfg.styles||[null,null],L:f.L,W:f.W,G:f.G,R3:f.R3,tick:0,phase:'kickoff',phaseT:0,clock:cfg.duration,duration:cfg.duration,ot:0,golden:false,
   cap:cfg.cap,score:[0,0],penalties:false,needPens:false,allowDraw:false,agg:cfg.agg||[0,0],kickoffTeam:0,pendingEnd:false,players:[],scorers:[],events:[],hist:new Array(HN),
   shotClock:SC,poss:-1,seed:(cfg.seed>>>0)||((Math.random()*4294967296)>>>0)||7,lastGoalTeam:null,
   ball:{x:0,y:0,z:0,vx:0,vy:0,vz:0,spin:0,holder:-1,lastTouch:-1,lastTeam:-1,roll:0,shot:null,dribT:0,age:0,reb:false}};
  cfg.lineups.forEach((lu,team)=>{
   lu.forEach(e=>{
    if(e.gk)return;
    const d=derive(cfg.equal?[78,78,78,78,78]:e.data.st);
    s.players.push(Object.assign({id:s.players.length,team,role:'field',name:e.data.n,num:e.data.num,
     x:0,y:0,vx:0,vy:0,face:team===0?0:Math.PI,stam:1,charging:false,charge:0,kind:'kick',cool:0,after:0,
     dive:null,diveT:0,holdT:0,kickAnim:0,run:0,slideT:0,recoverT:0,stunT:0,slideDx:1,slideDy:0,skill:null,skillCd:0,
     jz:0,jvz:0,swipeT:0,swipeCd:0,protT:0,shootT:0,dunkT:0,alleyT:0,pk:false,pp:false,pl:false,ps:false,psk:false,wantX:0,wantY:0},d));
   });
  });
  resetKickoff(s,cfg.kickoffTeam||0);
  for(let i=0;i<HN;i++)s.hist[i]={x:0,y:0,z:0};
  return s;
 }
 function resetP(p){p.skill=null;p.slideT=0;p.recoverT=0;p.stunT=0;p.vx=p.vy=0;p.charging=false;p.charge=0;p.cool=0.2;p.holdT=0;p.jz=0;p.jvz=0;p.swipeT=0;p.protT=0;p.shootT=0;p.dunkT=0;p.alleyT=0;}
 // saque desde el fondo: el equipo que ataca arranca con la pelota en su campo, el otro espera en su aro
 function resetKickoff(s,team){
  s.phase='kickoff';s.phaseT=0;s.kickoffTeam=team;s.shotClock=SC;s.poss=team;
  const b=s.ball;Object.assign(b,{vx:0,vy:0,vz:0,spin:0,shot:null,reb:false,age:0});
  const dir=team===0?1:-1;
  for(const t of [0,1]){
   const ps=s.players.filter(p=>p.team===t),n=ps.length,d=t===0?1:-1;
   ps.forEach((p,i)=>{
    resetP(p);
    if(t===team){
     if(i===0){p.x=-dir*(s.L/2-3.2);p.y=0;}
     else{p.x=-dir*(s.L*0.12);p.y=(i%2?-1:1)*s.W*0.26;}
     p.face=dir>0?0:Math.PI;
    }else{
     const hx=hoopX(s,1-t);// el aro que defiende
     p.x=hx-d*(-1)*0;p.x=hx+(t===0?1:-1)*(3.6+i*0.6);p.y=n===1?0:(i-(n-1)/2)*2.6;
     p.face=d>0?0:Math.PI;
    }
   });
  }
  const h=s.players.find(p=>p.team===team);
  if(h){b.holder=h.id;b.lastTouch=h.id;b.lastTeam=team;b.x=h.x+dir*0.35;b.y=h.y;b.z=0.9;}
  s.events.push({t:'whistle'});
 }

 function step(s,inputs){
  if(s.phase==='end')return;
  s.tick++;
  if(s.phase==='goal'){
   s.phaseT+=DT;
   if(s.phaseT>=1.7){
    if(s.pendingEnd){s.phase='end';s.events.push({t:'end'});return;}
    if(s.ftAfter){startFT(s,s.ftAfter.id,s.ftAfter.n);s.ftAfter=null;}
    else resetKickoff(s,1-s.lastGoalTeam);
   }
  }
  if(s.phase==='dead'){s.phaseT+=DT;if(s.phaseT>=1.1&&s.ftAfter){startFT(s,s.ftAfter.id,s.ftAfter.n);s.ftAfter=null;}}
  if(s.phase==='ft'){const f=s.ft;if(f.next>0){f.next-=DT;if(f.next<=0)ftReady(s);}}
  for(let i=0;i<s.players.length;i++)control(s,s.players[i],inputs[i]||NOIN);
  playerCollisions(s);
  for(const p of s.players)clampPlayer(s,p);
  moveBall(s);
  pickups(s);
  if(s.phase==='kickoff'){s.phaseT+=DT;const b=s.ball,h=b.holder>=0?s.players[b.holder]:null;if(!h||Math.hypot(h.vx,h.vy)>1.2||s.phaseT>3)s.phase='play';}
  // reloj de posesión
  if(s.phase==='play'){
   const b=s.ball,pt=b.holder>=0?s.players[b.holder].team:(b.shot?-2:b.lastTeam);
   if(pt>=0&&pt!==s.poss){s.poss=pt;s.shotClock=SC;}
   if(pt>=0||pt===-2){if(!b.shot)s.shotClock-=DT;}
   if(s.shotClock<=0&&!b.shot){
    const t=s.poss;s.events.push({t:'shotclock',team:t});
    let best=null,bd=1e9;for(const q of s.players)if(q.team!==t){const d=Math.hypot(q.x-b.x,q.y-b.y);if(d<bd){bd=d;best=q;}}
    if(best){if(b.holder>=0){const h=s.players[b.holder];h.charging=false;}b.holder=best.id;b.lastTouch=best.id;b.lastTeam=best.team;b.shot=null;b.reb=false;s.poss=best.team;s.shotClock=SC;best.cool=0.3;}
   }
  }
  if(s.phase==='play'||s.phase==='kickoff'){
   if(s.golden)s.ot+=DT;
   else{
    s.clock-=DT;
    if(s.clock<=0){
     s.clock=0;
     const b=s.ball;
     // si hay un tiro en el aire cuando suena la chicharra, vale si entra
     if(b.shot&&!b.shot.done){s.buzzer=true;}
     else endOrOT(s);
    }
   }
  }
  const b=s.ball;s.hist[s.tick%HN]={x:b.x,y:b.y,z:b.z};
 }
 function endOrOT(s){
  if(s.score[0]+s.agg[0]===s.score[1]+s.agg[1]){if(!s.golden){s.golden=true;s.events.push({t:'golden'});}}
  else{s.phase='end';s.events.push({t:'end'});}
 }

 // ---------------- control de cada jugador ----------------
 function control(s,p,inp){
  const b=s.ball;
  for(const k of ['cool','kickAnim','swipeT','swipeCd','protT','shootT','skillCd','stunT','alleyT','recvT'])if(p[k]>0)p[k]=Math.max(0,p[k]-DT);
  if(p.skill){p.skill.t+=DT;if(p.skill.t>=p.skill.dur)p.skill=null;}
  // en el aire
  const air=p.jz>0||p.jvz>0;
  if(air){p.jvz-=GRAV*DT;p.jz+=p.jvz*DT;if(p.jz<=0){p.jz=0;p.jvz=0;}}
  const has=b.holder===p.id;
  if(p.hangT>0){p.hangT-=DT;p.jz=Math.max(p.jz,0.95);p.jvz=0;p.vx=p.vy=0;if(p.hangT<=0)p.jvz=-0.5;}
  const ftLock=s.phase==='ft'||s.phase==='dead',ftShooter=s.phase==='ft'&&s.ft&&s.ft.id===p.id;
  const frozen=s.phase==='goal'||s.phase==='end'||(ftLock&&!ftShooter);
  if(ftLock){p.vx=p.vy=0;if(!ftShooter){p.charging=false;p.pk=!!inp.kick;p.pp=!!inp.pass;p.pl=!!inp.lob;p.ps=!!inp.slide;p.psk=!!inp.skill;return;}}
  let mx=frozen||ftLock?0:inp.mx,my=frozen||ftLock?0:inp.my;const ml=Math.hypot(mx,my);if(ml>1){mx/=ml;my/=ml;}
  if(ml>0.3){p.wantX=mx/Math.max(ml,1e-6);p.wantY=my/Math.max(ml,1e-6);}else{p.wantX=0;p.wantY=0;}
  p.hx=!!inp.hx;
  // marcar (PASE mantenido sin la pelota): se pone entre la pelota y el aro propio
  p.pressing=false;
  if(!has&&inp.pass&&!frozen&&b.holder>=0&&s.players[b.holder].team!==p.team){
   const hx=hoopX(s,1-p.team),tx0=b.x,ty0=b.y,gx=hx-tx0,gy=-ty0,gl=Math.hypot(gx,gy)||1;
   const tx=tx0+gx/gl*0.95,ty=ty0+gy/gl*0.95,dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy);
   mx=d>0.08?dx/d*Math.min(1,d*2):0;my=d>0.08?dy/d*Math.min(1,d*2):0;p.pressing=true;
  }
  const spr=!!inp.sprint&&p.stam>0.05&&Math.hypot(mx,my)>0.1&&!p.charging;
  const fat=0.84+0.16*Math.min(1,p.stam/0.35);
  const spd=p.maxSpd*(p.fire?1.05:1)*(spr?1.22:1)*(has?0.93:1)*(p.charging?0.3:1)*(p.stunT>0?0.35:1)*fat;
  if(!air){
   const k=1-Math.exp(-(Math.hypot(mx,my)>0.1?p.accel:p.accel*1.6)*DT);
   p.vx+=(mx*spd-p.vx)*k;p.vy+=(my*spd-p.vy)*k;
  }else{p.vx*=Math.exp(-0.6*DT);p.vy*=Math.exp(-0.6*DT);}
  if(p.skill&&p.skill.type==='roulette'){const u=p.skill.t/p.skill.dur;p.vx=p.skill.dx*p.maxSpd*1.05*(1-u*0.4);p.vy=p.skill.dy*p.maxSpd*1.05*(1-u*0.4);}
  p.x+=p.vx*DT;p.y+=p.vy*DT;
  const sp=Math.hypot(p.vx,p.vy);
  p.stam=clamp(p.stam+(spr?-0.32:sp>4?0.06:0.18)*DT,0,1);
  p.spr=spr;
  if(p.charging){const hx=hoopX(s,p.team);p.face=Math.atan2(-p.y,hx-p.x);}
  else if(sp>0.5)p.face=Math.atan2(p.vy,p.vx);
  p.run+=sp*DT*1.7;
  if(frozen){p.charging=false;p.pk=!!inp.kick;p.pp=!!inp.pass;p.pl=!!inp.lob;p.ps=!!inp.slide;p.psk=!!inp.skill;return;}
  const kickE=inp.kick&&!p.pk,passE=inp.pass&&!p.pp,lobE=inp.lob&&!p.pl,slideE=inp.slide&&!p.ps,skillE=inp.skill&&!p.psk;
  if(!inp.kick)p.kickUsed=false;
  const kickGo=inp.kick&&!p.kickUsed;
  p.pk=!!inp.kick;p.pp=!!inp.pass;p.pl=!!inp.lob;p.ps=!!inp.slide;p.psk=!!inp.skill;
  if(has){
   p.holdT+=DT;
   if(p.charging){
    p.charge+=DT/0.78;
    if(!inp.kick||p.charge>=1.2)shoot(s,p);
    return;
   }
   if(air)return;
   if(ftShooter){if(kickGo&&p.cool<=0){p.kickUsed=true;p.charging=true;p.charge=0;}return;}
   if(skillE&&p.skillCd<=0){ // giro / cambio de ritmo: sale para un costado protegiendo la pelota
    let dx=inp.sx||p.wantX,dy=inp.sy||p.wantY;if(Math.hypot(dx,dy)<0.3){dx=-Math.sin(p.face);dy=Math.cos(p.face);}
    const l=Math.hypot(dx,dy)||1;p.skill={type:'roulette',t:0,dur:0.34,dx:dx/l,dy:dy/l};p.skillCd=1.1;p.protT=0.5;
    s.events.push({t:'skill',type:'spin',id:p.id,x:p.x,y:p.y});return;
   }
   if(passE&&p.cool<=0){doPass(s,p,inp,false);return;}
   if(lobE&&p.cool<=0){doPass(s,p,inp,true);return;}
   if(kickGo&&p.cool<=0){
    p.kickUsed=true;const hx=hoopX(s,p.team),d=Math.hypot(hx-p.x,p.y);
    const toward=sp>1.5&&((hx-p.x)*p.vx+(-p.y)*p.vy)/(d*sp)>0.35;
    if(d<2.3&&(toward||d<1.4)){drive(s,p,spr||sp>4.6);return;}
    p.charging=true;p.charge=0;p.kind='kick';
   }
  }else{
   p.charging=false;
   if(kickGo&&!air&&p.cool<=0){p.kickUsed=true;p.jvz=p.jump;p.cool=0.75;s.events.push({t:'jump',id:p.id});}
   if((slideE)&&p.swipeCd<=0){
    p.swipeT=0.22;p.swipeCd=0.65;
    const h=b.holder>=0?s.players[b.holder]:null;
    if(h&&h.team!==p.team){
     const dx=h.x-p.x,dy=h.y-p.y,d=Math.hypot(dx,dy),bd=Math.hypot(b.x-p.x,b.y-p.y);
     if(d<1.25||bd<1.0){
      const behind=((p.x-h.x)*Math.cos(h.face)+(p.y-h.y)*Math.sin(h.face))<-0.2;
      let ch=0.22+0.12*p.def-0.12*h.ctrl+(h.charging?0.25:0)-(behind?0.12:0)+(bd<0.7?0.1:0);
      if(h.protT>0||h.skill)ch=0.03;
      if(rnd(s)<ch){
       let ax=b.x-h.x,ay=b.y-h.y;const al=Math.hypot(ax,ay)||1;ax/=al;ay/=al;
       b.holder=-1;b.shot=null;b.vx=ax*3.2+p.vx*0.4+(rnd(s)-0.5)*1.5;b.vy=ay*3.2+p.vy*0.4+(rnd(s)-0.5)*1.5;b.vz=1.2;b.z=0.7;
       b.lastTouch=p.id;b.lastTeam=p.team;b.age=0;h.charging=false;h.cool=0.45;
       s.events.push({t:'steal',id:p.id,team:p.team,x:b.x,y:b.y});
      }else if(s.fouls&&(behind||d<0.75)&&rnd(s)<0.22){s.events.push({t:'foul',id:p.id,team:p.team,x:h.x,y:h.y,reach:true});s.shotClock=Math.max(s.shotClock,10);p.swipeCd=1.2;}
      else s.events.push({t:'swipe',id:p.id});
     }
    }
   }
  }
 }

 // ---------- faltas y tiros libres ----------
 // falta en el tiro: un defensor encima que salta o manotea (o que te choca de costado)
 function foulOn(s,p,sp){
  if(!s.fouls||s.phase!=='play')return false;
  let best=null,bd=1e9;for(const o of s.players){if(o.team===p.team)continue;const d=Math.hypot(o.x-p.x,o.y-p.y);if(d<bd){bd=d;best=o;}}
  if(!best||bd>1.05)return false;
  let ch=bd<0.72?0.16:0.05;if(best.jz>0.1)ch+=0.12;if(best.swipeT>0)ch+=0.22;if(Math.hypot(best.vx,best.vy)>4)ch+=0.08;
  if(rnd(s)<ch){s.events.push({t:'foul',id:best.id,team:best.team,x:p.x,y:p.y,shooting:true});return true;}
  return false;
 }
 function startFT(s,id,n){
  const p=s.players[id];if(!p)return;
  const hx=hoopX(s,p.team),dir=p.team===0?1:-1;
  s.phase='ft';s.phaseT=0;s.ft={id,team:p.team,left:n,total:n,next:0};
  const ftx=hx-dir*4.6;
  const others=s.players.filter(q=>q!==p);let k=0;
  for(const q of others){resetP(q);const slot=k++;
   if(slot<4){q.x=hx-dir*(1.6+Math.floor(slot/2)*1.1);q.y=(slot%2?1:-1)*2.75;}else{q.x=ftx-dir*2.5;q.y=(slot%2?1:-1)*1.5;}
   q.face=Math.atan2(-q.y,hx-q.x);}
  resetP(p);ftReady(s);
  s.events.push({t:'freethrow',id,team:p.team,n});
 }
 function ftReady(s){
  const f=s.ft;if(!f)return;const p=s.players[f.id],hx=hoopX(s,p.team),dir=p.team===0?1:-1,b=s.ball;
  p.x=hx-dir*4.6;p.y=0;p.vx=p.vy=0;p.face=dir>0?0:Math.PI;p.cool=0.5;p.charging=false;p.charge=0;p.kickUsed=true;
  b.holder=p.id;b.shot=null;b.reb=false;b.lastTouch=p.id;b.lastTeam=p.team;b.dribT=0;f.next=0;
 }
 function ftShot(s,p,c){
  const tq=timingOf(c),prob=clamp(0.58*(1+0.32*p.sh2)*tq,0.15,0.97),make=rnd(s)<prob;
  const [tx,ty,tz]=aimFor(s,p.team,make,Math.max(0.6,tq));
  p.shootT=0.4;p.kickAnim=0.3;p.cool=0.4;
  launch(s,p,tx,ty,tz,0.85,2.3);
  s.ball.shot={team:p.team,id:p.id,pts:1,make,t:0,T:0.85,done:false,dunk:false,lay:false,ft:true};
  s.events.push({t:'kick',shot:true,ft:true,id:p.id,team:p.team,x:p.x,y:p.y,pts:1,prob,perfect:tq>1.1,late:c>PERF[1]+0.1,power:7,vx:s.ball.vx,vy:s.ball.vy});
 }
 // probabilidad de meter un tiro desde donde está (sin contar el medidor)
 function shotProb(s,p,timing){
  const hx=hoopX(s,p.team),d=Math.hypot(hx-p.x,p.y),three=d>s.R3-0.02;
  let base=d<1.3?0.84:d<3?0.68-0.04*(d-1.3):!three?0.55-0.02*(d-3):0.42-0.07*(d-s.R3);
  base=Math.max(0.015,base);
  const stat=three?1+0.42*p.sh3:1+0.3*p.sh2;
  let dd=1e9,jumping=false;
  for(const o of s.players){if(o.team===p.team)continue;const od=Math.hypot(o.x-p.x,o.y-p.y);const front=((o.x-p.x)*(hx-p.x)+(o.y-p.y)*(-p.y))>-0.3*od*d;if(front&&od<dd){dd=od;jumping=o.jz>0.15;}}
  let con=dd<0.75?0.52:dd<1.25?0.74:dd<2?0.9:1;if(jumping&&dd<1.4)con*=0.8;
  const mv=Math.hypot(p.vx,p.vy)>3.5?0.85:1;
  const t=timing==null?1:timing;
  return{prob:clamp(base*stat*con*mv*t*(p.fire?1.18:1),0.01,0.95),three,d,dd};
 }
 function timingOf(c){if(c>=PERF[0]&&c<=PERF[1])return 1.18;const dev=c<PERF[0]?PERF[0]-c:c-PERF[1];return Math.max(0.22,1-dev*(c<PERF[0]?1.6:3.2));}
 function launch(s,p,tx,ty,tz,T,z0){
  const b=s.ball;b.holder=-1;b.x=p.x+Math.cos(p.face)*0.25;b.y=p.y+Math.sin(p.face)*0.25;b.z=z0;
  b.vx=(tx-b.x)/T;b.vy=(ty-b.y)/T;b.vz=(tz-z0+0.5*GRAV*T*T)/T;b.lastTouch=p.id;b.lastTeam=p.team;b.age=0;b.reb=false;
 }
 function aimFor(s,team,make,q){
  const hx=hoopX(s,team),dirIn=team===0?1:-1;
  if(make)return[hx-dirIn*0.02,0,RIM_H+0.06];
  if(q<0.4&&rnd(s)<0.5)return[hx-dirIn*(0.75+rnd(s)*0.4),(rnd(s)-0.5)*0.8,RIM_H-0.2]; // ni toca el aro
  const a=rnd(s)*Math.PI*2,r=RIM_R+0.02+rnd(s)*0.1;return[hx+Math.cos(a)*r,Math.sin(a)*r,RIM_H+0.05];
 }
 function shoot(s,p){
  const c=p.charge;p.charging=false;p.charge=0;
  if(s.phase==='ft'){ftShot(s,p,c);return;}
  const tq=timingOf(c),sp=shotProb(s,p,tq),foul=foulOn(s,p,sp),make=rnd(s)<sp.prob*(foul?0.55:1);
  const pts=sp.three?3:2;
  const [tx,ty,tz]=aimFor(s,p.team,make,tq);
  p.jvz=p.jump*0.8;p.shootT=0.45;p.kickAnim=0.3;p.cool=0.4;
  const T=0.55+sp.d*0.055;
  launch(s,p,tx,ty,tz,T,2.15+0.2);
  s.ball.shot={team:p.team,id:p.id,pts,make,t:0,T,done:false,dunk:false,lay:false,foul};
  s.events.push({t:'kick',shot:true,cont:sp.dd<0.75?48:sp.dd<1.25?26:sp.dd<2?10:0,id:p.id,team:p.team,x:p.x,y:p.y,pts,prob:sp.prob,perfect:tq>1.2,late:c>PERF[1]+0.1,power:10,vx:s.ball.vx,vy:s.ball.vy});
 }
 // bandeja o volcada
 function drive(s,p,dunk){
  const hx=hoopX(s,p.team),d=Math.hypot(hx-p.x,p.y);
  const sp=shotProb(s,p,1);
  let prob=dunk?0.93:0.8*(1+0.18*p.sh2);
  if(dunk&&sp.dd<0.8)dunk=false; // con alguien encima no hay volcada: bandeja
  prob=dunk?0.93:0.8*(1+0.18*p.sh2);
  const con=sp.dd<0.8?0.42:sp.dd<1.4?0.7:1;prob=clamp(prob*con*(p.fire?1.1:1),0.05,0.97);
  const foul=foulOn(s,p,sp),make=rnd(s)<prob*(foul?0.55:1);
  const [tx,ty,tz]=aimFor(s,p.team,make,1);
  p.jvz=p.jump*(dunk?1.05:0.9);p.shootT=dunk?0.55:0.4;p.kickAnim=0.3;p.cool=0.4;p.dunkT=dunk?0.5:0;
  const dx=hx-p.x,dy=-p.y,dl=Math.hypot(dx,dy)||1;p.vx=dx/dl*Math.min(5,d*3);p.vy=dy/dl*Math.min(5,d*3);
  const T=dunk?0.36:0.42;
  launch(s,p,tx,ty,dunk?RIM_H+0.25:tz,T,dunk?2.7:2.4);
  s.ball.shot={team:p.team,id:p.id,pts:2,make,t:0,T,done:false,dunk,lay:!dunk,foul};
  s.events.push({t:'kick',shot:true,id:p.id,team:p.team,x:p.x,y:p.y,pts:2,prob,dunk,lay:!dunk,power:8,vx:s.ball.vx,vy:s.ball.vy});
 }
 // pase: a un compañero en la dirección que apuntás (con ayuda, se acomoda)
 function passTarget(s,p,dx,dy,assist){
  const dl=Math.hypot(dx,dy);if(dl<0.01)return null;dx/=dl;dy/=dl;
  const cone=assist?0.75:0.42;let best=null,bs=-1e9;
  for(const q of s.players){if(q.team!==p.team||q===p)continue;
   const ex=q.x-p.x,ey=q.y-p.y,d=Math.hypot(ex,ey);if(d<1.2||d>24)continue;
   const a=Math.acos(clamp((ex*dx+ey*dy)/d,-1,1));if(a>cone)continue;
   const sc=-a*3-d*0.05;if(sc>bs){bs=sc;best=q;}}
  return best;
 }
 function doPass(s,p,inp,lob){
  const b=s.ball;let dx=p.wantX,dy=p.wantY;if(!dx&&!dy){dx=Math.cos(p.face);dy=Math.sin(p.face);}
  const assist=!!(inp.assist&&inp.hx);
  let q=null;
  if(inp.aim){ // con el mouse: al compañero más cercano a la mira (si no hay ninguno cerca, a la mira)
   let bd=4.5;for(const o of s.players)if(o.team===p.team&&o!==p){const d=Math.hypot(o.x-inp.tx,o.y-inp.ty);if(d<bd){bd=d;q=o;}}
   if(!q){const ax=inp.tx-p.x,ay=inp.ty-p.y,al=Math.hypot(ax,ay)||1;dx=ax/al;dy=ay/al;}
  }else q=passTarget(s,p,dx,dy,assist);
  if(!q&&!inp.aim&&(inp.assist||!inp.hx)){let bd=1e9;for(const o of s.players)if(o.team===p.team&&o!==p){const d=Math.hypot(o.x-p.x,o.y-p.y);if(d<bd){bd=d;q=o;}}}
  const v=lob?8.5:13.5;
  let tx,ty,T;
  if(q){const d=Math.hypot(q.x-p.x,q.y-p.y);T=d/v;tx=q.x+q.vx*T*0.9;ty=q.y+q.vy*T*0.9;T=Math.hypot(tx-p.x,ty-p.y)/v;}
  else{T=10/v;tx=p.x+dx*10;ty=p.y+dy*10;}
  T=Math.max(0.12,T);
  const hx=hoopX(s,p.team),alley=lob&&q&&Math.hypot(hx-tx,ty)<3.4;
  launch(s,p,tx,ty,lob?(alley?2.9:1.7):1.2,T,1.25);
  if(alley){q.alleyT=T+0.5;}
  if(q)q.recvT=T+0.45;
  p.cool=0.25;p.kickAnim=0.18;
  s.events.push({t:'kick',pass:true,lob,alley:!!alley,id:p.id,team:p.team,x:p.x,y:p.y,power:6,vx:b.vx,vy:b.vy,to:q?q.id:-1});
 }
 function inReach(s,p){const b=s.ball;return b.holder<0&&Math.hypot(b.x-p.x,b.y-p.y)<=KR&&b.z<=2.2+p.jz;}

 // ---------------- pelota ----------------
 function moveBall(s){
  const b=s.ball;b.age+=DT;
  if(b.holder>=0){
   const h=s.players[b.holder],fx=Math.cos(h.face),fy=Math.sin(h.face),sp=Math.hypot(h.vx,h.vy);
   if(h.charging||h.dunkT>0){b.x=h.x+fx*0.2;b.y=h.y+fy*0.2;b.z=2.0+h.jz+Math.min(1,h.charge)*0.25;}
   else{
    const prev=Math.sin(b.dribT);b.dribT+=DT*(sp>0.6?9.5:7.5);const cur=Math.sin(b.dribT);
    if(prev>0&&cur<=0||prev<0&&cur>=0)s.events.push({t:'drib',x:b.x,y:b.y});
    // cambio de mano (crossover): si encarás para el otro lado, la pelota pasa a la otra mano con un pique bajo
    const lat=h.wantX*(-fy)+h.wantY*fx;if(h.hand==null){h.hand=1;h.handS=1;}
    if(Math.abs(lat)>0.55&&Math.sign(lat)!==h.hand){h.hand=Math.sign(lat);b.dribT=Math.PI*0.92;s.events.push({t:'cross',id:h.id});}
    h.handS+=(h.hand-h.handS)*Math.min(1,DT*16);
    const side=0.22*h.handS;b.x=h.x+fx*0.36-fy*side;b.y=h.y+fy*0.36+fx*side;b.z=BR+Math.abs(Math.sin(b.dribT))*(Math.abs(h.handS)<0.9?0.35:0.85)+h.jz;
   }
   b.vx=h.vx;b.vy=h.vy;b.vz=0;b.roll+=sp*DT*2;return;
  }
  const sh=b.shot;
  b.vz-=GRAV*DT;b.x+=b.vx*DT;b.y+=b.vy*DT;b.z+=b.vz*DT;
  b.roll+=Math.hypot(b.vx,b.vy)*DT*2;
  if(sh&&!sh.done){
   sh.t+=DT;
   if(sh.t>=sh.T){
    sh.done=true;const hx=hoopX(s,sh.team),dx=b.x-hx,dy=b.y,dh=Math.hypot(dx,dy);
    if(sh.make&&!sh.blocked){
     b.x=hx;b.y=0;b.z=RIM_H-0.05;b.vx=b.vy=0;b.vz=-2.2;
     score(s,sh);
    }else if(dh<RIM_R+0.35&&Math.abs(b.z-RIM_H)<0.5){
     // pega en el aro y sale
     let ax=dx,ay=dy;if(dh<0.05){const a=rnd(s)*Math.PI*2;ax=Math.cos(a);ay=Math.sin(a);}const al=Math.hypot(ax,ay)||1;
     const v=1.8+rnd(s)*2.6;ax/=al;ay/=al;
     // que tienda a salir hacia la cancha
     const into=sh.team===0?-1:1;ax=ax*0.6+into*0.5;ay=ay*0.8+(rnd(s)-0.5)*0.6;const l2=Math.hypot(ax,ay)||1;
     b.vx=ax/l2*v;b.vy=ay/l2*v;b.vz=1.6+rnd(s)*2.4;b.z=Math.max(b.z,RIM_H+0.02);
     s.events.push({t:'rim',x:b.x,y:b.y});s.shotClock=SC;b.reb=true;
    }else b.reb=true;
    if(!sh.make||sh.blocked){
     const sp0=s.players[sh.id];if(sp0&&!sh.ft)sp0.streak=0;
     if(sh.ft){const f=s.ft;f.left--;if(f.left>0){f.next=1.0;}else{s.phase='play';s.ft=null;s.shotClock=SC;}}
     else if(sh.foul&&s.fouls&&s.phase==='play'){s.ftAfter={id:sh.id,n:sh.pts};s.phase='dead';s.phaseT=0;}
    }
    if(s.buzzer&&s.phase!=='goal'){s.buzzer=false;endOrOT(s);}
   }
  }
  // tablero
  for(const sd of [-1,1]){
   const bx=sd*(s.L/2-BOARD_OFF);
   if(Math.abs(b.y)<0.92&&b.z>2.88&&b.z<3.98&&(b.x-bx)*sd>-BR&&(b.x-bx)*sd<0.2&&b.vx*sd>0){b.x=bx-sd*BR;b.vx*=-0.55;s.events.push({t:'board'});}
  }
  // piso
  if(b.z<BR){b.z=BR;if(b.vz<-1.2){b.vz=-b.vz*0.72;b.vx*=0.9;b.vy*=0.9;s.events.push({t:'bounce',v:Math.abs(b.vz)});}else{b.vz=0;const k=Math.exp(-1.4*DT);b.vx*=k;b.vy*=k;}}
  // paredes (sin laterales: rebota)
  const L2=s.L/2+0.6,W2=s.W/2+0.5;
  if(Math.abs(b.x)>L2){b.x=Math.sign(b.x)*L2;b.vx*=-0.55;}
  if(Math.abs(b.y)>W2){b.y=Math.sign(b.y)*W2;b.vy*=-0.55;}
 }
 function score(s,sh){
  if(s.phase==='goal'||s.phase==='end')return;
  const sc=s.players[sh.id];
  s.score[sh.team]+=sh.pts;s.lastGoalTeam=sh.team;
  // en llamas: tres canastas seguidas del mismo jugador (sin que el rival meta); se apaga cuando mete el rival
  for(const q of s.players)if(q.team!==sh.team){q.streak=0;if(q.fire){q.fire=false;s.events.push({t:'fireout',id:q.id});}}
  if(sc&&!sh.ft){sc.streak=(sc.streak||0)+1;if(sc.streak>=3&&!sc.fire){sc.fire=true;s.events.push({t:'fire',id:sc.id,team:sc.team});}}
  if(sc&&sh.dunk){sc.hangT=0.55;s.events.push({t:'hang',id:sc.id,team:sc.team});}
  if(sh.ft){
   s.scorers.push({name:sc?sc.name:'',team:sh.team,own:false,t:s.duration-s.clock,golden:s.golden,pts:1});
   s.events.push({t:'goal',team:sh.team,id:sh.id,name:sc?sc.name:'',pts:1,ft:true,own:false,v:4});
   const f=s.ft;f.left--;
   if(f.left>0&&!s.golden&&!(s.cap>0&&s.score[sh.team]>=s.cap)){f.next=1.0;return;}
   s.ft=null;s.phase='goal';s.phaseT=0.6;
   if(s.golden||(s.cap>0&&s.score[sh.team]>=s.cap)||(s.clock<=0&&s.score[0]+s.agg[0]!==s.score[1]+s.agg[1]))s.pendingEnd=true;
   return;
  }
  if(sh.foul&&s.fouls)s.ftAfter={id:sh.id,n:1};
  s.scorers.push({name:sc?sc.name:'',team:sh.team,own:false,t:s.duration-s.clock,golden:s.golden,pts:sh.pts});
  s.events.push({t:'goal',team:sh.team,id:sh.id,name:sc?sc.name:'',pts:sh.pts,dunk:sh.dunk,lay:sh.lay,alley:!!sh.alley,andOne:!!(sh.foul&&s.fouls),own:false,v:8});
  s.phase='goal';s.phaseT=0;s.buzzer=false;
  if(s.golden||(s.cap>0&&s.score[sh.team]>=s.cap)||(s.clock<=0&&!s.golden&&s.score[0]+s.agg[0]!==s.score[1]+s.agg[1]))s.pendingEnd=true;
 }
 // ¿alguien la agarra? (rebote, pase, pelota suelta) · tapas
 function pickups(s){
  const b=s.ball;if(b.holder>=0||s.phase==='goal'||s.phase==='end'||s.phase==='ft'||s.phase==='dead')return;
  const sh=b.shot;
  if(sh&&!sh.done){
   if(sh.t<sh.T*0.6&&!sh.blocked){
    for(const p of s.players){
     if(p.team===sh.team||p.jz<0.12)continue;
     const hd=Math.hypot(b.x-p.x,b.y-p.y),top=2.55+p.jz+0.25*(1+p.reb*0.3);
     const sx=s.players[sh.id],front=sx?((p.x-sx.x)*(SIM_hx(s,sh.team)-sx.x)+(p.y-sx.y)*(-sx.y))>0:true;
     if(hd<PR+0.42&&b.z>1.8&&b.z<top&&front&&p.jz>0.2){
      sh.tried=sh.tried||{};if(sh.tried[p.id])continue;sh.tried[p.id]=1;
      if(rnd(s)>(sh.dunk?0.22:sh.lay?0.32:0.22)+0.12*p.def)continue;
      let ax=b.x-p.x,ay=b.y-p.y;const al=Math.hypot(ax,ay)||1;
      const into=sh.team===0?-1:1;
      b.vx=ax/al*2.5+into*2.5;b.vy=ay/al*2.5+(rnd(s)-0.5)*2;b.vz=-1.5;sh.blocked=true;sh.done=true;b.shot=null;b.reb=true;
      b.lastTouch=p.id;b.lastTeam=p.team;
      s.events.push({t:'block',id:p.id,team:p.team,x:p.x,y:p.y});return;
     }
    }
   }
   if(sh.t<sh.T)return;
  }
  let best=null,bs=1e9;
  for(const p of s.players){
   if(p.stunT>0||p.skill)continue;
   if(b.lastTouch===p.id&&b.age<0.3)continue;
   const hd=Math.hypot(b.x-p.x,b.y-p.y);
   const reach=2.2+p.jz+(p.alleyT>0?0.6:0);
   if(hd<PR+0.33&&b.z<=reach){const sc=hd-p.jz*0.8;if(sc<bs){bs=sc;best=p;}}
  }
  if(!best)return;
  const p=best,wasReb=b.reb,shTeam=b.shot?b.shot.team:b.lastTeam;
  // alley-oop: la agarra en el aire cerca del aro y la mete
  const hx=hoopX(s,p.team);
  if(p.alleyT>0&&b.z>1.9&&Math.hypot(hx-p.x,p.y)<2.6&&b.lastTeam===p.team){
   b.holder=p.id;b.shot=null;b.reb=false;p.alleyT=0;b.lastTouch=p.id;b.lastTeam=p.team;
   s.events.push({t:'grab',id:p.id,team:p.team});
   if(p.jz<0.2)p.jvz=p.jump;drive(s,p,true);s.ball.shot.alley=true;return;
  }
  b.holder=p.id;b.shot=null;b.reb=false;b.lastTouch=p.id;b.lastTeam=p.team;b.dribT=0;p.holdT=0;p.alleyT=0;
  s.events.push({t:'grab',id:p.id,team:p.team});
  if(wasReb)s.events.push({t:'rebound',id:p.id,team:p.team,off:shTeam===p.team,x:p.x,y:p.y});
 }

 function playerCollisions(s){
  const ps=s.players;
  for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){
   const a=ps[i],c=ps[j];if(Math.abs(a.jz-c.jz)>1.2)continue;
   const dx=c.x-a.x,dy=c.y-a.y,d=Math.hypot(dx,dy),m=PR*2;
   if(d>=m||d<1e-6)continue;
   const nx=dx/d,ny=dy/d,ov=m-d,wa=c.mass/(a.mass+c.mass),wc=a.mass/(a.mass+c.mass);
   a.x-=nx*ov*wa;a.y-=ny*ov*wa;c.x+=nx*ov*wc;c.y+=ny*ov*wc;
   const rv=(c.vx-a.vx)*nx+(c.vy-a.vy)*ny;if(rv<0){const imp=rv*0.6;a.vx+=nx*imp*wa;a.vy+=ny*imp*wa;c.vx-=nx*imp*wc;c.vy-=ny*imp*wc;}
  }
 }
 function clampPlayer(s,p){
  const L2=s.L/2+0.5,W2=s.W/2+0.4;
  if(Math.abs(p.x)>L2){p.x=Math.sign(p.x)*L2;p.vx=0;}
  if(Math.abs(p.y)>W2){p.y=Math.sign(p.y)*W2;p.vy=0;}
  // debajo del aro no se puede pasar por el poste
  for(const sd of [-1,1]){const px=sd*(s.L/2+0.3);if(Math.abs(p.x-px)<0.5&&Math.abs(p.y)<0.5){p.x=px-sd*0.5;}}
 }
 function perceive(s,delay){const i=((s.tick-delay)%HN+HN)%HN;return s.hist[i]||s.ball;}
 function previewKick(){return{reach:false,ax:0,ay:0};}
 return{startFT,KR,DT,PR,BR,GD,BAR,RC,RIM_H,RIM_R,HOOP_OFF,BOARD_OFF,PERF,SC,FORMATS,createMatch,step,perceive,clamp,previewKick,passTarget,shotProb,hoopX,inReach};
})();

/* =====================================================================
   AI — CPU de básquet: ataque con espacios, cortes y tiros abiertos; defensa hombre a hombre
   ===================================================================== */
const STYLES={base:{pace:1,three:1,drive:1,press:1}};
function teamStyle(id){return STYLES.base;}
const AI=(()=>{
 const DIFF={easy:{delay:7,spd:0.82,noise:0.16,thr:0.5,steal:0.5,react:0.3},normal:{delay:2,spd:0.97,noise:0.06,thr:0.4,steal:1,react:0.16},hard:{delay:0,spd:1,noise:0.045,thr:0.38,steal:1.35,react:0.08}};
 const clamp=SIM.clamp;
 const blank=()=>({mx:0,my:0,kick:false,lob:false,sprint:false,slide:false,dive:false,skill:false,pass:false,sx:0,sy:0,hx:false});
 function moveTo(inp,p,tx,ty,spd,urgent){const dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy);if(d<0.15)return;const k=Math.min(1,d/0.8)*spd;inp.mx=dx/d*k;inp.my=dy/d*k;if(urgent&&d>3&&p.stam>0.35)inp.sprint=true;}
 const rnd=()=>Math.random();
 function field(s,p,diffName){
  const D=DIFF[diffName]||DIFF.normal,inp=blank();
  if(s.phase==='goal'||s.phase==='end'||s.phase==='dead')return inp;
  if(s.phase==='ft'){
   if(s.ft&&s.ft.id===p.id&&s.ball.holder===p.id&&p.cool<=0){
    if(p.charging)inp.kick=p.charge<(p.aiT||0.8);else{inp.kick=!p.pk;p.aiT=clamp(0.81+(Math.random()-0.5)*2*D.noise,0.6,1.05);}}
   return inp;
  }
  const b=s.ball,mates=s.players.filter(q=>q.team===p.team),opps=s.players.filter(q=>q.team!==p.team);
  const myHoop=SIM.hoopX(s,p.team),ownHoop=SIM.hoopX(s,1-p.team),dir=p.team===0?1:-1;
  const idx=mates.indexOf(p);
  const holder=b.holder>=0?s.players[b.holder]:null;
  // tiro en el aire: ir al rebote y saltar cuando baja
  if(b.holder<0&&b.shot&&!b.shot.done){
   const hx=SIM.hoopX(s,b.shot.team),side=b.shot.team===p.team;
   const shooter=s.players[b.shot.id];
   // ¿llego a tapar?
   if(!side&&b.shot.t<b.shot.T*0.45&&Math.hypot(b.x-p.x,b.y-p.y)<1.3&&p.jz===0&&rnd()<0.5)inp.kick=true;
   const ry=(idx%2?1:-1)*1.2,rx=hx-(b.shot.team===0?1:-1)*(1.6+idx*0.5);
   if(!(side&&p===shooter&&idx>0))moveTo(inp,p,rx,ry,D.spd,true);
   return edges(p,inp);
  }
  // me la pasaron: voy a buscarla
  if(b.holder<0&&p.recvT>0&&b.lastTeam===p.team&&!b.shot){
   const ex=b.x-p.x,ey=b.y-p.y,vv=b.vx*b.vx+b.vy*b.vy||1,tt=Math.max(0,-(ex*b.vx+ey*b.vy)/vv);
   moveTo(inp,p,b.x+b.vx*Math.min(tt,0.8),b.y+b.vy*Math.min(tt,0.8),1,false);return edges(p,inp);}
  // pelota suelta (rebote, robo, pase largo): los más cercanos la buscan
  if(b.holder<0){
   const t=Math.min(0.6,Math.hypot(b.x-p.x,b.y-p.y)/7),fx=b.x+b.vx*t,fy=b.y+b.vy*t;
   const ranked=s.players.slice().sort((a,c)=>Math.hypot(a.x-fx,a.y-fy)-Math.hypot(c.x-fx,c.y-fy));
   const myRank=ranked.filter(q=>q.team===p.team).indexOf(p);
   if(myRank===0||(myRank===1&&Math.hypot(p.x-fx,p.y-fy)<4)){
    moveTo(inp,p,fx,fy,D.spd,true);
    if(b.z>1.7&&b.z<3.4&&Math.hypot(b.x-p.x,b.y-p.y)<0.9&&b.vz<0.5&&p.jz===0)inp.kick=true;
    return edges(p,inp);
   }
   // el resto: a su lugar (si era nuestra, ataque; si no, defensa)
   if(b.lastTeam===p.team)return edges(p,offBall(s,p,inp,D,mates,idx,myHoop,dir));
   return edges(p,defend(s,p,inp,D,opps,idx,ownHoop,null));
  }
  let r;
  if(holder===p)r=withBall(s,p,inp,D,mates,opps,myHoop,dir);
  else if(holder.team===p.team)r=offBall(s,p,inp,D,mates,idx,myHoop,dir);
  else r=defend(s,p,inp,D,opps,idx,ownHoop,holder);
  return edges(p,r);
 }
 // los botones de acción se apretan y se sueltan (el juego mira cuándo se aprietan); tirar se mantiene
 function edges(p,inp){
  if(inp.kick&&p.pk&&!p.charging)inp.kick=false;
  if(inp.pass&&p.pp)inp.pass=false;if(inp.lob&&p.pl)inp.lob=false;if(inp.slide&&p.ps)inp.slide=false;if(inp.skill&&p.psk)inp.skill=false;
  return inp;
 }
 function withBall(s,p,inp,D,mates,opps,hx,dir){
  const b=s.ball,d=Math.hypot(hx-p.x,p.y);
  if(p.charging){inp.kick=p.charge<(p.aiT||0.8);return inp;}
  if(s.phase==='kickoff'){moveTo(inp,p,hx-dir*6,p.y*0.5,D.spd,false);return inp;}
  let dd=1e9,def=null;for(const o of opps){const od=Math.hypot(o.x-p.x,o.y-p.y);if(od<dd){dd=od;def=o;}}
  const defFront=def&&((def.x-p.x)*(hx-p.x)+(def.y-p.y)*(-p.y))>0;
  const urgent=s.shotClock<4;
  // cerca del aro y con el camino libre: bandeja o volcada
  if(d<2.2){const toward=((hx-p.x)*p.vx+(-p.y)*p.vy)/(d*(Math.hypot(p.vx,p.vy)||1));
   moveTo(inp,p,hx-dir*0.6,0,D.spd,false);if(toward>0.4||d<1.3){inp.kick=true;inp.sprint=dd>1.2;}return inp;}
  const sp=SIM.shotProb(s,p,1);
  if(p.holdT<0.05||!p.plan)p.plan=Math.random()<0.4+0.25*p.sh3?'jumper':'drive';
  const laneOpen=!defFront||dd>2.2;
  if(p.plan==='drive'&&!laneOpen&&p.holdT>1.2&&Math.random()<0.02)p.plan='jumper';
  const thr=p.plan==='drive'&&!urgent?0.9:urgent?0.05:(D.thr+(sp.three?-0.08:0)-(p.holdT>3.5?0.08:0));
  if(sp.prob>thr&&(dd>1.1||urgent)&&p.cool<=0){
   inp.kick=true;p.aiT=clamp(0.81+(Math.random()-0.5)*2*D.noise,0.5,1.1);moveTo(inp,p,p.x,p.y,0,false);return inp;}
  // pase a un compañero libre si me marcan encima o hace rato que la tengo
  if((dd<1.15&&defFront&&Math.random()<0.06)||(p.holdT>2.5&&Math.random()<0.03)){
   let best=null,bs=-1e9;
   for(const q of mates){if(q===p)continue;
    let near=1e9;for(const o of opps)near=Math.min(near,Math.hypot(o.x-q.x,o.y-q.y));
    let lane=true;const lx=q.x-p.x,ly=q.y-p.y,ll=Math.hypot(lx,ly)||1;
    for(const o of opps){const t=clamp(((o.x-p.x)*lx+(o.y-p.y)*ly)/(ll*ll),0,1);if(Math.hypot(p.x+lx*t-o.x,p.y+ly*t-o.y)<0.7){lane=false;break;}}
    if(!lane)continue;const qp=SIM.shotProb(s,q,1).prob;const sc=near*0.6+qp*4-ll*0.05+(q.cutT>0?2:0);if(sc>bs){bs=sc;best=q;}}
   if(best&&bs>1.4){const lx=best.x-p.x,ly=best.y-p.y,l=Math.hypot(lx,ly)||1;inp.mx=lx/l;inp.my=ly/l;
    const hd=Math.hypot(hx-best.x,best.y);if(best.cutT>0&&hd<3&&Math.random()<0.5)inp.lob=true;else inp.pass=true;inp.hx=true;inp.assist=true;return inp;}
  }
  // cortina puesta: sale por el lado contrario al defensor, pegado al compañero
  const scr=mates.find(m=>m!==p&&m.screenT>0.5&&def&&Math.hypot(m.x-def.x,m.y-def.y)<1.2);
  if(scr&&def){const ax=scr.x-def.x,ay=scr.y-def.y;moveTo(inp,p,scr.x+ax*0.8+(hx-p.x)*0.2,scr.y+ay*0.8-p.y*0.2,D.spd,true);p.plan='drive';return inp;}
  // encerrado por el defensor: giro, paso atrás y tiro, o pase
  const blocked=defFront&&dd<1.35;
  p.blockT=blocked?(p.blockT||0)+SIM.DT:0;
  if(p.sbT>0){p.sbT-=SIM.DT;const ax=p.x-def.x,ay=p.y-def.y,al=Math.hypot(ax,ay)||1;inp.mx=ax/al;inp.my=ay/al;
   if(p.sbT<=0&&p.cool<=0){inp.kick=true;p.aiT=clamp(0.81+(Math.random()-0.5)*2*D.noise,0.5,1.1);}return inp;}
  if(p.blockT>0.45+Math.random()*0.3){
   p.blockT=0;const r=Math.random();
   if(r<0.4&&p.skillCd<=0){inp.skill=true;const sd=(p.y-def.y)>=0?1:-1;const ux=(hx-p.x)/d,uy=-p.y/d;inp.sx=-uy*sd*0.8+ux*0.6;inp.sy=ux*sd*0.8+uy*0.6;return inp;}
   if(r<0.7&&!sp.three&&sp.d>2.5){p.sbT=0.3;return inp;}
  }
  // penetrar: hacia el aro, abriéndose hacia el lado libre
  let tx=hx-dir*1.0,ty=0;
  if(def&&defFront&&dd<2.6){const side=(p.y-def.y)>=0?1:-1;ty=clamp(def.y+side*1.7,-s.W/2+0.8,s.W/2-0.8);tx=p.x+dir*1.2;}
  if((tx-hx)*dir>-0.7)tx=hx-dir*0.7;
  if(Math.hypot(p.vx,p.vy)<1.2)p.stuckT=(p.stuckT||0)+SIM.DT;else p.stuckT=0;
  if(p.stuckT>1.2&&p.cool<=0&&sp.prob>0.06){p.stuckT=0;inp.kick=true;p.aiT=clamp(0.81+(Math.random()-0.5)*2*D.noise,0.5,1.1);return inp;}
  if(d>s.R3+2)ty=p.y*0.8;
  moveTo(inp,p,tx,ty,D.spd,d>s.R3+3&&dd>2.5);
  return inp;
 }
 function offBall(s,p,inp,D,mates,idx,hx,dir){
  const b=s.ball,R3=s.R3,W2=s.W/2;
  if(p.screenT>0&&holder0(s,p)){
   const h=holder0(s,p);p.screenT-=SIM.DT;
   let df=null,dd=1e9;for(const o of s.players)if(o.team!==p.team){const d=Math.hypot(o.x-h.x,o.y-h.y);if(d<dd){dd=d;df=o;}}
   if(df&&p.screenT>0.5){const ax=h.x-df.x,ay=h.y-df.y,al=Math.hypot(ax,ay)||1,side=((p.y-df.y)*ax-(p.x-df.x)*ay)>=0?1:-1;
    moveTo(inp,p,df.x-ay/al*side*0.85,df.y+ax/al*side*0.85,D.spd,true);if(Math.hypot(p.x-df.x,p.y-df.y)<1.1){inp.mx*=0.2;inp.my*=0.2;}return inp;}
   if(p.screenT<=0.5){p.screenT=0;p.cutT=1.1;}
  }
  if(p.cutT>0){p.cutT-=SIM.DT*6;moveTo(inp,p,hx-dir*1.0,(idx%2?0.6:-0.6),D.spd,true);return inp;}
  // lugares para abrir la cancha: arriba, alas, esquinas
  const spots=[[hx-dir*(R3+0.5),0],[hx-dir*R3*0.72,-R3*0.72],[hx-dir*R3*0.72,R3*0.72],[hx-dir*0.7,-(W2-0.8)],[hx-dir*0.7,W2-0.8]];
  const holder=b.holder>=0?s.players[b.holder]:null;
  let sp=spots[(idx*2+1)%spots.length];
  if(holder){const taken=spots.map(q=>Math.hypot(q[0]-holder.x,q[1]-holder.y));let best=-1,bs=-1e9;
   spots.forEach((q,i)=>{const others=mates.filter(m=>m!==p&&m!==holder).some(m=>Math.hypot(m.x-q[0],m.y-q[1])<2.2&&mates.indexOf(m)<idx);const sc=taken[i]*0.5-(others?10:0)-Math.abs(i-(idx*2+1)%5)*0.4;if(sc>bs){bs=sc;best=i;}});sp=spots[best];}
  if(s.phase==='kickoff'){moveTo(inp,p,(sp[0]+(-dir*s.L*0.1))/2,sp[1],D.spd,false);return inp;}
  // cortina para el que tiene la pelota si lo marcan encima (el más cercano a él)
  if(holder&&s.phase==='play'&&!(p.screenT>0)&&Math.random()<0.0035){
   let close=1e9;for(const o of s.players)if(o.team!==p.team)close=Math.min(close,Math.hypot(o.x-holder.x,o.y-holder.y));
   const nearest=mates.filter(m=>m!==holder).sort((a,c)=>Math.hypot(a.x-holder.x,a.y-holder.y)-Math.hypot(c.x-holder.x,c.y-holder.y))[0];
   if(close<1.5&&nearest===p&&Math.hypot(hx-holder.x,holder.y)>3){p.screenT=2.2;s.events.push({t:'screen',id:p.id});}
  }
  // corte al aro de vez en cuando, si mi defensor está lejos o distraído
  if(holder&&Math.random()<0.004&&Math.hypot(hx-p.x,p.y)>3){p.cutT=1;}
  moveTo(inp,p,clamp(sp[0],-s.L/2+0.5,s.L/2-0.5),clamp(sp[1],-W2+0.5,W2-0.5),D.spd,Math.abs(p.x-sp[0])>6);
  return inp;
 }
 function defend(s,p,inp,D,opps,idx,hx,holder){
  const b=s.ball;
  // hombre a hombre por orden; si mi hombre no tiene la pelota, me separo un poco hacia el aro
  const man=opps[idx%opps.length]||opps[0];
  const onBall=holder&&man===holder;
  let gap=onBall?0.95:Math.min(2.4,0.8+Math.hypot(man.x-b.x,man.y-b.y)*0.25);
  // ayuda: si el que tiene la pelota le ganó a su marca y yo estoy cerca del camino, salgo
  if(holder&&!onBall){
   const hd=s.players.filter(q=>q.team===p.team).find(q=>{const i2=s.players.filter(z=>z.team===p.team).indexOf(q);return (opps[i2%opps.length]||opps[0])===holder;});
   const beat=hd&&Math.hypot(hd.x-hx,hd.y)>Math.hypot(holder.x-hx,holder.y)+0.6;
   if(beat&&Math.hypot(holder.x-hx,holder.y)<5&&Math.hypot(p.x-holder.x,p.y-holder.y)<4.5){const gx=hx-holder.x,gy=-holder.y,gl=Math.hypot(gx,gy)||1;moveTo(inp,p,holder.x+gx/gl*1.0,holder.y+gy/gl*1.0,D.spd,true);return inp;}
  }
  // reacciona con un poco de retraso (así se le puede ganar con un cambio de ritmo)
  let mxp=man.x,myp=man.y;if(onBall){const bp=SIM.perceive(s,D.delay+4);mxp=bp.x;myp=bp.y;}
  const gx=hx-mxp,gy=-myp,gl=Math.hypot(gx,gy)||1;
  const tx=mxp+gx/gl*gap,ty=myp+gy/gl*gap;
  const back=Math.hypot(p.x-tx,p.y-ty)>5;
  moveTo(inp,p,tx,ty,D.spd,back);
  if(onBall&&(Math.hypot(holder.vx,holder.vy)>5.5||Math.hypot(p.x-tx,p.y-ty)>1.2)&&p.stam>0.15)inp.sprint=true;
  if(onBall){
   const d=Math.hypot(holder.x-p.x,holder.y-p.y);
   // salta a tapar cuando el tirador ya está armando el tiro
   if(holder.charging&&holder.charge>0.35+D.react&&d<1.9&&p.jz===0&&p.cool<=0)inp.kick=true;
   // manotazo para robar, de vez en cuando
   if(d<1.1&&p.swipeCd<=0&&Math.random()<0.008*D.steal*(holder.protT>0?0.2:1))inp.slide=true;
  }
  return inp;
 }
 function holder0(s,p){const b=s.ball;if(b.holder<0)return null;const h=s.players[b.holder];return h.team===p.team&&h!==p?h:null;}
 function keeper(s,p,d){return field(s,p,d);}
 return{field,keeper};
})();


/* =====================================================================
   PENALES — lógica pura (sin pantalla). Coordenadas del arco vistas desde el pateador:
   x = lateral (−3.66 palo izquierdo … +3.66 palo derecho), y = altura (0 … 2.44), distancia 11 m.
   Nada se decide con un dado: el resultado sale de dónde fue la pelota, con qué fuerza,
   y de para dónde y cuándo se tiró el arquero.
   ===================================================================== */
const PEN=(()=>{
 const W=3.66,H=2.44,D=11,BR=0.11;
 const clamp=(v,a,b)=>v<a?a:v>b?b:v;
 const sf=v=>clamp((v-75)/25,-1,1);
 const ease=p=>1-(1-p)*(1-p);
 // Estado del arquero en un instante (tiempo desde la patada). dive.t = cuándo se tiró, relativo a la patada (negativo = antes).
 function keeperAt(dive,tk,gk){
  const rf=1+(gk.reach-80)/180,spd=1+(gk.refl-80)/180;
  const out={kx:0,half:0.72*rf,lo:0,hi:2.0,e:0,side:0,dy:0};
  if(!dive)return out;
  const dt=tk-dive.t;if(dt<=0)return out;
  const e=ease(Math.min(1,dt/(0.5/spd)));out.e=e;out.dy=dive.dy;
  if(Math.abs(dive.dx)>0.3){
   out.side=Math.sign(dive.dx);out.kx=out.side*2.6*rf*e;out.half=(0.58+0.22*e)*rf;
   if(dive.dy>0.3){out.lo=0.6*e;out.hi=2.0+0.5*e;}
   else if(dive.dy<-0.3){out.lo=0;out.hi=2.0-0.6*e;}
   else{out.lo=0.15*e;out.hi=2.0+0.15*e;}
  }else if(dive.dy>0.3){out.hi=2.0+0.5*e;out.half=0.85*rf;}
  else if(dive.dy<-0.3){out.hi=2.0-0.7*e;out.half=(0.72+0.25*e)*rf;}
  return out;
 }
 function resolve(shot,dive,gk){
  const ax=Math.abs(shot.x);
  if(shot.y>H+BR*0.7)return{r:'over'};
  if(ax>W+BR*0.7)return{r:'wide'};
  if(ax>W-BR*1.3)return{r:'post'};
  if(shot.y>H-BR*1.3)return{r:'bar'};
  const T=D/shot.speed,k=keeperAt(dive,T,gk);
  const saved=Math.abs(shot.x-k.kx)<=k.half&&shot.y>=k.lo&&shot.y<=k.hi;
  return{r:saved?'save':'goal',T};
 }
 const isGoal=r=>r==='goal';
 // Patada humana: mira + pulso (que el control del jugador achica) + carga.
 function humanShot(aim,charge,shooter,swayOn,time){
  const ctrl=sf(shooter.st[3]),tiro=sf(shooter.st[2]);
  const perfect=charge>=0.76&&charge<=0.86;
  const A=swayOn?0.42*(1-0.45*ctrl)*(perfect?0.4:1):0;
  const sx=Math.sin(time*2.1)*A,sy=Math.cos(time*1.6)*A*0.6;
  const p=clamp(charge/0.75,0,1);
  let y=aim.y+sy;if(charge>0.86)y+=(charge-0.86)*7;
  return{x:aim.x+sx,y:Math.max(0.05,y),speed:(15+14*Math.pow(p,1.1))*(1+0.08*tiro),perfect};
 }
 function sway(shooter,time,charge){const ctrl=sf(shooter.st[3]);const perfect=charge>=0.76&&charge<=0.86;const A=0.42*(1-0.45*ctrl)*(perfect?0.4:1);return{x:Math.sin(time*2.1)*A,y:Math.cos(time*1.6)*A*0.6};}
 const sideOf=x=>x<-0.8?0:x>0.8?2:1;
 function pickW(w,r){const s=w.reduce((a,b)=>a+b,0);let v=r()*s;for(let i=0;i<w.length;i++){v-=w[i];if(v<=0)return i;}return w.length-1;}
 // Arquero CPU: elige lado leyendo hacia dónde patea el rival habitualmente; reacciona según sus reflejos.
 function cpuDive(gk,shotHist,r){
  const c=[0,0,0];for(const x of shotHist.slice(-6))c[sideOf(x)]++;
  const s=pickW([1+c[0]*1.3,0.45+c[1]*0.9,1+c[2]*1.3],r);
  const dy=r()<0.3?1:r()<0.4?-1:0;
  const t=0.12+0.08*(1-clamp((gk.refl-75)/25,0,1));
  return{dx:s===0?-1:s===2?1:0,dy:s===1&&dy===0?(r()<0.5?-1:0):dy,t};
 }
 // Pateador CPU: evita el lado al que más se tira el arquero; si el arquero se movió antes, patea al otro lado.
 function cpuShot(shooter,diveHist,earlyDive,r){
  const c=[0,0,0];for(const d of diveHist.slice(-6))c[d<0?0:d>0?2:1]++;
  let s=pickW([1+c[2]*1.3,0.5+c[0]*0.2+c[2]*0.2,1+c[0]*1.3],r);
  if(earlyDive&&Math.abs(earlyDive.dx)>0.3)s=earlyDive.dx<0?2:0;
  const acc=sf(shooter.st[2]),ctrl=sf(shooter.st[3]);
  let x=s===0?-(2.2+r()*1.1):s===2?(2.2+r()*1.1):(r()-0.5)*0.9;
  let y=r()<0.3?1.5+r()*0.8:0.2+r()*1.0;
  const err=(1-0.35*(acc+ctrl));
  x+=(r()-0.5)*0.9*err;y+=(r()-0.5)*0.6*err;
  const p=0.72+r()*0.24;
  return{x,y:Math.max(0.05,y),speed:(15+14*Math.pow(p,1.1))*(1+0.08*acc),perfect:false};
 }
 // Tanda completa CPU vs CPU (para los partidos que no juega el usuario)
 function autoShootout(ta,tb,r){
  const order=[ta,tb].map(t=>[...t.players].sort((a,b)=>b.st[2]-a.st[2]));
  const res=[[],[]],hist={shots:[[],[]],dives:[[],[]]};
  for(let k=0;k<40;k++){
   const team=k%2,kt=1-team,sh=order[team][res[team].length%order[team].length],gk=[ta,tb][kt].gk;
   const shot=cpuShot(sh,hist.dives[kt],null,r),dive=cpuDive(gk,hist.shots[team],r);
   res[team].push(isGoal(resolve(shot,dive,gk).r));hist.shots[team].push(shot.x);hist.dives[kt].push(dive.dx);
   if(decided(res))break;
  }
  return[res[0].filter(Boolean).length,res[1].filter(Boolean).length];
 }
 function decided(res){
  const a=res[0].filter(Boolean).length,b=res[1].filter(Boolean).length,ka=res[0].length,kb=res[1].length;
  if(ka<=5&&kb<=5){if(a+(5-ka)<b||b+(5-kb)<a)return true;if(ka===5&&kb===5)return a!==b;return false;}
  return ka===kb&&a!==b;
 }
 return{W,H,D,BR,keeperAt,resolve,isGoal,humanShot,sway,cpuDive,cpuShot,autoShootout,decided};
})();

/* @@DOM — de acá para abajo: input, render, audio e interfaz */
if(typeof document!=='undefined'){

/* ===================== INPUT ===================== */
const keys=new Set(),tapped=new Set(); // tapped: toques rapidísimos que caen entre dos ticks
const PROFILES={
 1:{up:['KeyW'],down:['KeyS'],left:['KeyA'],right:['KeyD'],kick:['Space'],lob:['KeyE'],slide:['KeyQ'],sprint:['ShiftLeft'],skill:['KeyR'],pass:['KeyF'],swap:['KeyC']},
 2:{pass:['Semicolon','Numpad5'],swap:['Comma','Numpad6'],up:['ArrowUp'],down:['ArrowDown'],left:['ArrowLeft'],right:['ArrowRight'],kick:['Enter','Numpad0','NumpadEnter'],lob:['ShiftRight','NumpadDecimal'],slide:['ControlRight','Numpad2','Period'],sprint:['Slash','Numpad1'],skill:['Quote','NumpadAdd','Numpad3']}
};
const GAME_KEYS=new Set(Object.values(PROFILES).flatMap(p=>Object.values(p).flat()));
const padPrev={},skillPrev={},padStickPrev={};
// Controles táctiles: se suman al jugador 1. Multitáctil con pointer events (cada dedo tiene su id).
const touch={on:('ontouchstart' in window)||navigator.maxTouchPoints>0||(window.matchMedia&&matchMedia('(pointer: coarse)').matches),mx:0,my:0,joyId:null,ox:0,oy:0,held:{},tap:{}};
// Algunos navegadores (o la página donde se publica el juego) bloquean el joystick y getGamepads() tira error:
// en ese caso se juega solo con teclado, sin congelar el partido.
let padsBlocked=false;
function getPads(){if(padsBlocked||!navigator.getGamepads)return[];try{return navigator.getGamepads()||[];}catch(e){padsBlocked=true;return[];}}
function readHuman(slot){
 // k: teclas mantenidas (movimiento, sprint). kt: además cuenta toques rapidísimos, SOLO para acciones.
 const P=PROFILES[slot],k=a=>a.some(c=>keys.has(c)),kt=a=>a.some(c=>keys.has(c)||tapped.has(c));
 let mx=(k(P.right)?1:0)-(k(P.left)?1:0),my=(k(P.down)?1:0)-(k(P.up)?1:0);
 let kick=kt(P.kick),lob=kt(P.lob),sprint=k(P.sprint),slide=kt(P.slide),pass=kt(P.pass),swap=kt(P.swap);
 // filigrana: mantené la tecla de filigrana y tocá una dirección (o mové el stick derecho)
 let skill=false,sx=0,sy=0;
 let sdx=(k(P.right)?1:0)-(k(P.left)?1:0),sdy=(k(P.down)?1:0)-(k(P.up)?1:0),skillHeld=k(P.skill);
 const T=slot===1&&touch.on;
 if(T){
  const jm=Math.hypot(touch.mx,touch.my);
  if(jm>0.15){mx=touch.mx;my=touch.my;}
  kick=kick||!!touch.held.kick||!!touch.tap.kick;lob=lob||!!touch.held.lob||!!touch.tap.lob;slide=slide||!!touch.held.slide||!!touch.tap.slide;sprint=sprint||!!touch.held.sprint;
  pass=pass||!!touch.held.pass||!!touch.tap.pass;swap=swap||!!touch.tap.swap;
  if(touch.held.skill){skillHeld=true;if(jm>0.5){sdx=Math.abs(touch.mx)>0.38*jm?Math.sign(touch.mx):0;sdy=Math.abs(touch.my)>0.38*jm?Math.sign(touch.my):0;}}
  touch.tap={};
 }
 const combo=skillHeld&&(sdx||sdy)?sdx+','+sdy:'';
 if(combo&&combo!==skillPrev[slot]){skill=true;sx=sdx;sy=sdy;}
 skillPrev[slot]=combo;
 const pads=getPads();const gp=pads[slot-1];
 if(gp){
  const rx=gp.axes[2]||0,ry=gp.axes[3]||0,rm=Math.hypot(rx,ry);
  if(rm>0.75&&!(padStickPrev[slot]>0.75)){skill=true;sx=rx;sy=ry;}
  padStickPrev[slot]=rm;
  const ax=gp.axes[0]||0,ay=gp.axes[1]||0;if(Math.hypot(ax,ay)>0.22){mx=ax;my=ay;}
  const bt=i=>!!(gp.buttons[i]&&gp.buttons[i].pressed);
  if(bt(14))mx=-1;if(bt(15))mx=1;if(bt(12))my=-1;if(bt(13))my=1;
  kick=kick||bt(0);lob=lob||bt(2);slide=slide||bt(1);sprint=sprint||bt(7)||bt(5);pass=pass||bt(3);swap=swap||bt(4);
  const st=bt(9);if(st&&!padPrev[slot])togglePause();padPrev[slot]=st;
 }
 for(const a of [P.kick,P.lob,P.slide,P.pass,P.swap])for(const c of a)tapped.delete(c);
 const l=Math.hypot(mx,my);if(l>1){mx/=l;my/=l;}
 if(slot===1&&cam2kOn()){const yw=game.k2.yaw,fw=-my,rt=mx;mx=fw*Math.cos(yw)-rt*Math.sin(yw);my=fw*Math.sin(yw)+rt*Math.cos(yw);}
 let aim=false,tx=0,ty=0;
 if(slot===1&&mouseOn()){const w=mouseWorld();if(w){aim=true;tx=w[0];ty=w[1];kick=kick||mouse.l;pass=pass||mouse.r;}}
 return{aim,tx,ty,mx,my,kick,lob,sprint,slide,pass,swap,dive:false,skill,sx,sy,hx:true,assist:setup.assist==null?!!touch.on:!!setup.assist};
}
// Cada tecla se reconoce de dos formas: por su posición física (e.code) y por la letra que escribe (e.key).
// Algunos teclados, escritorios remotos o vistas embebidas mandan una sola de las dos.
function codesOf(e){
 const out=[];if(e.code)out.push(e.code);
 const k=e.key||'';
 if(k.length===1&&/[a-z]/i.test(k))out.push('Key'+k.toUpperCase());
 else if(k===' '||k==='Spacebar')out.push('Space');
 else if(k.startsWith('Arrow'))out.push(k);
 else if(k==='Shift')out.push(e.location===2?'ShiftRight':'ShiftLeft');
 else if(k==='Control')out.push(e.location===2?'ControlRight':'ControlLeft');
 else if(k==='Enter')out.push('Enter');
 else if(k==='Escape'||k==='Esc')out.push('Escape');
 else if(k==='/')out.push('Slash');else if(k==='.')out.push('Period');
 return[...new Set(out)];
}
const keyLog=[];
function actionOf(c){for(const[slot,P]of Object.entries(PROFILES))for(const[act,list]of Object.entries(P))if(list.includes(c))return'P'+slot+' '+({up:'arriba',down:'abajo',left:'izquierda',right:'derecha',kick:'patear',lob:'globo',slide:'barrida',sprint:'sprint',pass:'pase',swap:'cambiar jugador',skill:'filigrana'}[act]);return'—';}
addEventListener('keydown',e=>{
 const cs=codesOf(e);
 if(game&&!game.demo&&cs.some(c=>GAME_KEYS.has(c)))e.preventDefault();
 for(const c of cs){keys.add(c);if(!e.repeat)tapped.add(c);}
 if(!e.repeat){keyLog.unshift(`${e.key===' '?'Espacio':e.key}  ·  ${e.code||'(sin código)'}  →  ${actionOf(cs[cs.length-1]||'')!=='—'?actionOf(cs[cs.length-1]):actionOf(cs[0]||'')}`);keyLog.length=Math.min(keyLog.length,6);const el=document.getElementById('keyTest');if(el)el.textContent=keyLog.join('\n');}
 if(cs.includes('Escape')&&!e.repeat)togglePause();
 if(cs.includes('KeyM')&&!e.repeat)muted=!muted;
},true);
addEventListener('keyup',e=>{const cs=codesOf(e);for(const c of cs)keys.delete(c);if(game&&!game.demo&&cs.some(c=>GAME_KEYS.has(c)))e.preventDefault();},true);
// Si la ventana del juego pierde el foco, el navegador deja de mandarle las teclas: pausamos y avisamos.
addEventListener('blur',()=>{keys.clear();tapped.clear();if(game&&!game.demo&&!game.paused&&!game.netMenu&&game.state.phase!=='end'){togglePause(true);}});

/* ===================== RENDER ===================== */
const LW=540,LH=300,YC=0.72,ZC=0.85;
const screen=document.getElementById('screen'),sctx=screen.getContext('2d');
const buf=document.createElement('canvas');buf.width=LW;buf.height=LH;const bx=buf.getContext('2d');
let view=null,pitch=null,pitchKey='';
const DIG={0:['###','#.#','#.#','#.#','###'],1:['.#.','##.','.#.','.#.','###'],2:['###','..#','###','#..','###'],3:['###','..#','.##','..#','###'],4:['#.#','#.#','###','..#','..#'],5:['###','#..','###','..#','###'],6:['###','#..','###','#.#','###'],7:['###','..#','.#.','.#.','.#.'],8:['###','#.#','###','#.#','###'],9:['###','#.#','###','..#','###']};

function makeView_fut(s){
 // cámara un poco abierta: deja lugar para que se vea el estadio entero alrededor de la cancha
 const ppm=Math.min((LW-150)/(s.L+2*SIM.GD+2.4),(LH-112)/((s.W+2.4)*YC+SIM.BAR*ZC));
 return{ppm,cx:LW/2,cy:LH/2+12};
}
function P(x,y,z=0){return[view.cx+x*view.ppm,view.cy+y*view.ppm*YC-z*view.ppm*ZC];}
function px(c,x,y,col){c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),1,1);}
function pline(c,x0,y0,x1,y1,col){
 x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);c.fillStyle=col;
 const dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1;let e=dx+dy;
 for(let i=0;i<4000;i++){c.fillRect(x0,y0,1,1);if(x0===x1&&y0===y1)break;const e2=2*e;if(e2>=dy){e+=dy;x0+=sx;}if(e2<=dx){e+=dx;y0+=sy;}}
}
function pellipse(c,cx,cy,rx,ry,col){const n=Math.max(24,Math.round((rx+ry)*3));c.fillStyle=col;let lx=null,ly=null;for(let i=0;i<=n;i++){const a=i/n*Math.PI*2,x=Math.round(cx+Math.cos(a)*rx),y=Math.round(cy+Math.sin(a)*ry);if(x!==lx||y!==ly)c.fillRect(x,y,1,1);lx=x;ly=y;}}
function hexMix(a,b,t){const pa=parseInt(a.slice(1),16),pb=parseInt(b.slice(1),16);const r=(pa>>16)*(1-t)+(pb>>16)*t,g=(pa>>8&255)*(1-t)+(pb>>8&255)*t,bl=(pa&255)*(1-t)+(pb&255)*t;return'#'+((1<<24)|(r<<16)|(g<<8)|bl).toString(16).slice(1).replace(/\..*/,'');}
function mix(a,b,t){const pa=parseInt(a.slice(1),16),pb=parseInt(b.slice(1),16);const ch=s=>Math.round(((pa>>s)&255)*(1-t)+((pb>>s)&255)*t);return`rgb(${ch(16)},${ch(8)},${ch(0)})`;}

/* ===================== ESTADIOS, HINCHADA Y FIESTA =====================
   Cada equipo juega de local en su estadio, dibujado a partir de su arquitectura real:
   cantidad de bandejas, palcos, tipo de techo y lo que lo sostiene (arco, mástiles, torres,
   pilones), iluminación, pista de atletismo, cabeceras y detalles únicos.
   Vista: tribuna de enfrente arriba, cabeceras a los costados (la popular local a la izquierda,
   los visitantes a la derecha) y la tribuna de atrás abajo. */
const ENDW=34; // ancho de las cabeceras
// n nombre · c ciudad · seats colores de butacas por bandeja · tiers bandejas · band separación entre bandejas
// roof techo: none|canti|ring|membrane|retract|wave · sup lo que lo sostiene · lights · track pista · ext detalle único
// shape: box|oval|bowl|cylinder · endL/endR cabeceras · seatMode 'sectors' (sectores de colores) · mosaic texto en butacas
const SD=(n,c,o)=>Object.assign({n,c,seats:['#888','#666'],tiers:2,band:'fascia',roof:'none',roofCol:'#d6d9de',sup:null,lights:'towers',track:null,ext:null,shape:'box',endL:'popular',endR:'std',seatMode:null,mosaic:null,motto:null},o);
const MONUMENTAL=SD('MÂS MONUMENTAL','Buenos Aires',{seats:['#D71920','#F4F4F2','#D71920'],tiers:3,band:'gap',shape:'oval',lights:'poles',endL:'popular',endR:'popular',seatMode:'stripes',motto:'NÚÑEZ'});
const MARACANA=SD('MARACANÃ','Río de Janeiro',{seats:['#FFD60A','#1D4CB3','#F4F4F2'],tiers:2,band:'gap',roof:'membrane',sup:'ringbeam',shape:'oval',lights:'roof',seatMode:'sectors',endL:'curve',endR:'curve'});
const SANSIRO=SD('SAN SIRO','Milán',{seats:['#c81d25','#1e5aa8','#2a9d4a','#e07b1a'],tiers:3,band:'gap',roof:'canti',roofCol:'#4b525a',sup:'towers',shape:'box',lights:'roof',seatMode:'sectors'});
const AZTECA=SD('ESTADIO AZTECA','Ciudad de México',{seats:['#9aa0a8','#b9bcc2'],tiers:2,band:'palcos',roof:'ring',roofCol:'#8d949d',shape:'oval',lights:'roof',endL:'curve',endR:'curve'});
const STADIUMS={
 boc:SD('LA BOMBONERA','Buenos Aires',{seats:['#0A2D7A','#F5C400','#0A2D7A'],tiers:3,band:'gap',ext:'boxwall',lights:'rim',shape:'box',endL:'steep',endR:'steep',motto:'LA 12'}),
 riv:MONUMENTAL,arg:Object.assign({},MONUMENTAL,{motto:'ARGENTINA'}),
 rac:SD('EL CILINDRO','Avellaneda',{seats:['#7DC4EA','#F4F4F2','#7DC4EA'],tiers:3,band:'gap',shape:'cylinder',lights:'rim',endL:'curve',endR:'curve',motto:'LA ACADEMIA'}),
 ind:SD('LIBERTADORES DE AMÉRICA','Avellaneda',{seats:['#D0021B','#D0021B'],tiers:2,band:'fascia',roof:'canti',roofCol:'#ececea',sup:'columns',lights:'roof',motto:'EL ROJO'}),
 slo:SD('NUEVO GASÓMETRO','Bajo Flores',{seats:['#0A2D7A','#D0021B'],tiers:2,band:'gap',lights:'towers',motto:'EL CICLÓN'}),
 est:SD('ESTADIO UNO','La Plata',{seats:['#E1001A','#F4F4F2'],tiers:2,band:'fascia',roof:'canti',roofCol:'#f0f0ec',sup:'truss',lights:'roof',motto:'EL PINCHA'}),
 vel:SD('JOSÉ AMALFITANI','Liniers',{seats:['#F4F4F2','#0A2D7A'],tiers:2,band:'gap',lights:'towers',motto:'EL FORTÍN'}),
 cen:SD('GIGANTE DE ARROYITO','Rosario',{seats:['#003DA5','#FFD100'],tiers:2,band:'gap',lights:'towers',motto:'LA CANALLA'}),
 nob:SD('COLOSO MARCELO BIELSA','Rosario',{seats:['#D0021B','#16161B'],tiers:2,band:'fascia',roof:'canti',roofCol:'#b9bcc2',sup:'columns',lights:'towers',motto:'LA LEPRA'}),
 tal:SD('MARIO ALBERTO KEMPES','Córdoba',{seats:['#0A2D7A','#F4F4F2'],tiers:2,band:'fascia',roof:'canti',roofCol:'#f2f2ee',sup:'cables',track:'#b5523b',shape:'oval',lights:'roof',endL:'curve',endR:'curve',motto:'LA T'}),
 bra:MARACANA,fla:Object.assign({},MARACANA,{motto:'MENGÃO'}),
 fra:SD('STADE DE FRANCE','Saint-Denis',{seats:['#1C2753','#9aa0a8','#1C2753'],tiers:3,band:'fascia',roof:'ring',roofCol:'#d9dbdf',sup:'needles',shape:'oval',lights:'roof',endL:'curve',endR:'curve'}),
 esp:SD('LA CARTUJA','Sevilla',{seats:['#C8102E','#FFC400'],tiers:2,band:'gap',roof:'canti',roofCol:'#e8e8e4',sup:'cables',track:'#c0563a',shape:'oval',lights:'roof',endL:'curve',endR:'curve'}),
 eng:SD('WEMBLEY','Londres',{seats:['#C8102E','#C8102E','#C8102E'],tiers:3,band:'fascia',roof:'retract',roofCol:'#d6d9de',sup:'arch',shape:'bowl',lights:'roof'}),
 ale:SD('OLYMPIASTADION','Berlín',{seats:['#3a4a63','#8d949d'],tiers:2,band:'gap',roof:'membrane',track:'#2457b8',shape:'oval',lights:'roof',endL:'curve',endR:'gate'}),
 por:SD('ESTÁDIO DA LUZ','Lisboa',{seats:['#C8102E','#C8102E','#C8102E'],tiers:3,band:'fascia',roof:'membrane',sup:'arches',shape:'bowl',lights:'roof'}),
 uru:SD('CENTENARIO','Montevideo',{seats:['#5CBFEB','#F4F4F2'],tiers:2,band:'gap',ext:'tower',shape:'oval',lights:'towers',endL:'curve',endR:'curve',motto:'LA OLÍMPICA'}),
 ned:SD('JOHAN CRUIJFF ARENA','Ámsterdam',{seats:['#C8102E','#8d949d'],tiers:2,band:'fascia',roof:'retract',roofCol:'#8d949d',sup:'truss',shape:'bowl',lights:'roof'}),
 ita:SD('STADIO OLIMPICO','Roma',{seats:['#0066B3','#2f7ac0'],tiers:2,band:'gap',roof:'membrane',sup:'cables',track:'#b5523b',shape:'oval',lights:'roof',endL:'curve',endR:'curve'}),
 col:SD('METROPOLITANO','Barranquilla',{seats:['#FCD116','#003893','#CE1126'],tiers:2,band:'gap',lights:'towers',shape:'oval',seatMode:'sectors',endL:'curve',endR:'curve'}),
 pal:SD('ALLIANZ PARQUE','São Paulo',{seats:['#006437','#006437'],tiers:2,band:'fascia',roof:'canti',roofCol:'#e9ebee',sup:'cables',shape:'box',lights:'roof',motto:'VERDÃO'}),
 bot:SD('NILTON SANTOS','Río de Janeiro',{seats:['#16161B','#9aa0a8'],tiers:2,band:'fascia',roof:'canti',roofCol:'#e8e8e4',sup:'arches',track:'#b5523b',shape:'box',lights:'roof',motto:'ENGENHÃO'}),
 sao:SD('MORUMBIS','São Paulo',{seats:['#D0021B','#F4F4F2','#16161B'],tiers:2,band:'gap',shape:'oval',lights:'rim',seatMode:'sectors',endL:'curve',endR:'curve',motto:'TRICOLOR'}),
 mci:SD('ETIHAD STADIUM','Mánchester',{seats:['#6CABDD','#6CABDD','#1C2C5B'],tiers:3,band:'fascia',roof:'canti',roofCol:'#e8ebef',sup:'masts',shape:'bowl',lights:'roof'}),
 ars:SD('EMIRATES STADIUM','Londres',{seats:['#EF0107','#EF0107','#EF0107'],tiers:3,band:'fascia',roof:'ring',roofCol:'#e8ebef',sup:'truss',shape:'bowl',lights:'roof'}),
 liv:SD('ANFIELD','Liverpool',{seats:['#C8102E','#C8102E','#C8102E'],tiers:3,band:'fascia',roof:'canti',roofCol:'#c9ccd1',sup:'truss',shape:'box',lights:'roof',endL:'kop',motto:'THE KOP'}),
 che:SD('STAMFORD BRIDGE','Londres',{seats:['#034694','#034694'],tiers:2,band:'fascia',roof:'canti',roofCol:'#b9bcc2',sup:'columns',shape:'box',lights:'roof'}),
 mun:SD('OLD TRAFFORD','Mánchester',{seats:['#DA291C','#DA291C','#DA291C'],tiers:3,band:'fascia',roof:'canti',roofCol:'#d0d3d8',sup:'truss',shape:'box',lights:'roof',mosaic:'MANCHESTER UNITED',motto:'THEATRE OF DREAMS'}),
 tot:SD('TOTTENHAM HOTSPUR STADIUM','Londres',{seats:['#132257','#132257','#132257'],tiers:3,band:'fascia',roof:'membrane',shape:'bowl',lights:'roof',endL:'wall'}),
 new:SD("ST JAMES' PARK",'Newcastle',{seats:['#16161B','#16161B'],tiers:2,band:'fascia',roof:'canti',roofCol:'#e8e8e4',sup:'bigcanti',shape:'box',lights:'roof'}),
 rma:SD('SANTIAGO BERNABÉU','Madrid',{seats:['#c3c7cd','#c3c7cd','#c3c7cd'],tiers:3,band:'fascia',roof:'retract',roofCol:'#b8bec6',ext:'ribbon',shape:'bowl',lights:'roof',screen:true}),
 fcb:SD('SPOTIFY CAMP NOU','Barcelona',{seats:['#004D98','#A50044','#004D98'],tiers:3,band:'fascia',ext:'cranes',shape:'oval',lights:'poles',mosaic:'MÉS QUE UN CLUB',endL:'curve',endR:'curve',motto:'EN OBRAS'}),
 atm:SD('METROPOLITANO','Madrid',{seats:['#CB3524','#F4F4F2','#CB3524'],tiers:2,band:'fascia',roof:'wave',roofCol:'#eeeeea',sup:'cables',shape:'bowl',lights:'roof'}),
 ath:SD('SAN MAMÉS','Bilbao',{seats:['#EE2523','#F4F4F2'],tiers:2,band:'fascia',roof:'canti',roofCol:'#f0f0ec',ext:'panels',shape:'bowl',lights:'roof'}),
 bet:SD('BENITO VILLAMARÍN','Sevilla',{seats:['#00954C','#F4F4F2'],tiers:3,band:'fascia',roof:'canti',roofCol:'#e8e8e4',shape:'bowl',lights:'roof'}),
 int:SANSIRO,mil:SANSIRO,
 juv:SD('ALLIANZ STADIUM','Turín',{seats:['#F4F4F2','#16161B'],tiers:2,band:'fascia',roof:'canti',roofCol:'#e8e8e4',sup:'pylon2',shape:'box',lights:'roof'}),
 nap:SD('DIEGO ARMANDO MARADONA','Nápoles',{seats:['#12A0D7','#12A0D7'],tiers:2,band:'gap',roof:'canti',roofCol:'#d9dbdf',sup:'truss',shape:'oval',lights:'roof',endL:'curve',endR:'curve'}),
 bay:SD('ALLIANZ ARENA','Múnich',{seats:['#8d949d','#8d949d','#8d949d'],tiers:3,band:'fascia',roof:'membrane',ext:'cushion',shape:'bowl',lights:'roof',endL:'wall',motto:'SÜDKURVE'}),
 bvb:SD('SIGNAL IDUNA PARK','Dortmund',{seats:['#FDE100','#16161B'],tiers:2,band:'fascia',roof:'canti',roofCol:'#9aa0a8',sup:'pylons',shape:'box',lights:'roof',endL:'wall',motto:'SÜDTRIBÜNE'}),
 psg:SD('PARC DES PRINCES','París',{seats:['#1A2A57','#DA291C'],tiers:2,band:'gap',roof:'canti',roofCol:'#8d949d',ext:'ribs',shape:'oval',lights:'roof',endL:'curve',endR:'curve'}),
 larg86:Object.assign({},AZTECA,{motto:'MÉXICO 86'}),lbra70:Object.assign({},AZTECA,{motto:'MÉXICO 70'}),
 lbra02:SD('ESTADIO DE YOKOHAMA','Yokohama',{seats:['#1D4CB3','#F4F4F2'],tiers:2,band:'fascia',roof:'canti',roofCol:'#e8e8e4',sup:'arches',track:'#b5523b',shape:'oval',lights:'roof',endL:'curve',endR:'curve',motto:'2002'}),
 lwld:SD('ESTADIO DE LAS LEYENDAS','Fútbol',{seats:['#C9A227','#16161B'],tiers:3,band:'palcos',roof:'ring',roofCol:'#C9A227',shape:'bowl',lights:'roof'})
};
['lriv:riv','lboc:boc','lcen:cen','lnob:nob','lfcb:fcb','lrma:rma'].forEach(x=>{const[a,b]=x.split(':');STADIUMS[a]=STADIUMS[b];});
function stadiumOf_fut(t){return STADIUMS[t.id]||SD('ESTADIO '+t.name.toUpperCase(),'',{seats:[t.kit.p,t.kit.s===t.kit.p?'#F4F4F2':t.kit.s],roof:'canti'});}

let crowd=null,stadLayout=null,stadPlates=null;
const CROWD_SKIN=['#F3CBA5','#DDA77E','#B07A50','#7A4B2C','#e8b88e'];
function srnd(seed){let x=seed>>>0||1;return()=>((x=Math.imul(x^(x>>>15),2246822507)+0x9e3779b9>>>0)/4294967296);}
function pxText(g,txt,x,y,col,shadow,align){g.font='8px Silkscreen, monospace';g.textBaseline='middle';g.textAlign=align||'center';if(shadow){g.fillStyle=shadow;g.fillText(txt,x+1,y+1);}g.fillStyle=col;g.fillText(txt,x,y);}
function hexA(h,a){const v=parseInt(h.slice(1),16);return`rgba(${v>>16},${(v>>8)&255},${v&255},${a.toFixed(3)})`;}

// ===== ESTADIOS v3: la planta real de cada estadio =====
// Cada estadio se dibuja como una planta vista desde arriba en diagonal: la forma (óvalo, redondo, caja con
// esquinas abiertas o llenas, la "D" de la Bombonera), las bandejas siguiendo esa forma, el techo donde está,
// la fachada, lo que hay afuera (barrio, parque, río, estacionamiento) y las estructuras propias en su lugar.
// Geometría por estadio. T/B/L/R: cuánto del margen ocupa cada tribuna (arriba = la de enfrente).
// n: forma de afuera (2 = óvalo, 3-5 = bowl, 14 = caja) · nIn/kIn: borde de adentro (pista o apron)
// corners: 'open' deja las esquinas libres · roof: fracción techada de cada lado · env: lo que rodea al estadio
const GEO={
 'LA BOMBONERA':{n:16,nB:2.7,nIn:16,T:0.9,B:1,L:0.95,R:0.95,tiers:[0.36,0.33,0.31],band:'gap',far:'palcos',roof:0,env:'boca',facade:'mural',lights:'rim'},
 'MÂS MONUMENTAL':{n:2.25,nIn:5,kIn:1.05,T:1,B:1,L:1,R:1,tiers:[0.52,0.48],band:'gap',roof:{T:0.18,B:0.18,L:0,R:0},roofCol:'#e9ebee',env:'city',river:[1.2,-0.6,0.95],facade:'concrete',lights:'poles'},
 'EL CILINDRO':{n:2,nIn:2,kIn:1.5,circle:1,T:1,B:1,L:1,R:1,tiers:[0.5,0.5],band:'gap',roof:0,env:'city',neighbor:{at:[0.94,0.95],col:'#D0021B',r:44},facade:'concrete',lights:'rim'},
 'LIBERTADORES DE AMÉRICA':{n:6,nIn:14,T:0.9,B:0.9,L:0.85,R:0.85,tiers:[0.55,0.45],band:'fascia',roof:0.42,roofCol:'#ececea',env:'city',neighbor:{at:[0.05,0.07],col:'#7DC4EA',r:44,ring:1},facade:'panels',lights:'roof'},
 'NUEVO GASÓMETRO':{n:14,nIn:14,corners:'open',T:0.7,B:0.75,L:0.85,R:0.6,tiers:[0.55,0.45],band:'gap',roof:0,env:'barrio',lights:'towers'},
 'ESTADIO UNO':{n:4,nIn:12,T:0.95,B:0.85,L:0.85,R:0.85,tiers:[0.5,0.5],band:'fascia',roof:0.5,roofCol:'#f0f0ec',env:'park',lights:'roof',sup:'truss'},
 'JOSÉ AMALFITANI':{n:14,nIn:14,corners:'open',T:0.75,B:0.65,L:0.6,R:0.6,tiers:[1],band:'gap',roof:{T:0.35,B:0,L:0,R:0},roofCol:'#9aa0a8',env:'barrio',lights:'towers'},
 'GIGANTE DE ARROYITO':{n:14,nIn:14,corners:'open',T:0.8,B:0.7,L:0.75,R:0.75,tiers:[0.55,0.45],band:'gap',roof:0,env:'city',river:[-0.2,-1.4,-0.25],lights:'towers'},
 'COLOSO MARCELO BIELSA':{n:9,nIn:14,T:0.95,B:0.85,L:0.75,R:0.75,tiers:[0.55,0.45],band:'fascia',roof:{T:0.5,B:0.45,L:0,R:0},roofCol:'#b9bcc2',env:'park',lights:'towers'},
 'MARIO ALBERTO KEMPES':{n:2.4,nIn:4,kIn:1.18,track:'#b5523b',T:1,B:1,L:1,R:1,tiers:[0.55,0.45],band:'fascia',roof:{T:0.55,B:0.45,L:0,R:0},roofCol:'#f2f2ee',env:'park',lights:'roof',sup:'cables'},
 'MARACANÃ':{n:2.3,nIn:4,kIn:1.1,T:1,B:1,L:1,R:1,tiers:[0.5,0.5],band:'gap',roof:0.62,roofKind:'membrane',env:'plaza',facade:'concrete',lights:'roof'},
 'STADE DE FRANCE':{n:2.6,nIn:4,kIn:1.12,T:1,B:1,L:1,R:1,tiers:[0.38,0.33,0.29],band:'fascia',roof:0.7,roofKind:'glass',roofCol:'#c9ccd1',env:'plaza',river:[0,1.4,1.25],lights:'roof',sup:'needles'},
 'LA CARTUJA':{n:2.4,nIn:4,kIn:1.18,track:'#c0563a',T:1,B:1,L:1,R:1,tiers:[0.55,0.45],band:'gap',roof:{T:0.55,B:0.5,L:0.3,R:0.3},roofCol:'#e8e8e4',env:'park',river:[-1.3,0,-0.12],lights:'roof',sup:'cables'},
 'WEMBLEY':{n:4.5,nIn:10,T:0.95,B:1,L:1,R:1,tiers:[0.38,0.33,0.29],band:'fascia',roof:0.6,roofCol:'#d6d9de',env:'city',facade:'glass',lights:'roof',sup:'arch'},
 'OLYMPIASTADION':{n:2.2,nIn:3.5,kIn:1.2,track:'#2457b8',T:1,B:1,L:1,R:1,tiers:[0.5,0.5],band:'gap',roof:0.5,roofKind:'membrane',env:'park',facade:'stone',gate:'R',lights:'roof'},
 'ESTÁDIO DA LUZ':{n:4.5,nIn:10,T:1,B:1,L:1,R:1,tiers:[0.38,0.33,0.29],band:'fascia',roof:0.55,roofKind:'membrane',env:'city',lights:'roof',sup:'arches'},
 'CENTENARIO':{n:2.5,nIn:4,kIn:1.12,T:1,B:1,L:1,R:1,tiers:[0.55,0.45],band:'gap',roof:0,env:'park',facade:'concrete',lights:'towers',tower:1},
 'JOHAN CRUIJFF ARENA':{n:4,nIn:12,T:1,B:0.85,L:1,R:1,tiers:[0.5,0.5],band:'fascia',roof:0.75,roofKind:'retract',roofCol:'#8d949d',env:'parking',highway:1,lights:'roof',sup:'truss'},
 'STADIO OLIMPICO':{n:2.3,nIn:3.5,kIn:1.2,track:'#2f5fb0',T:1,B:1,L:1,R:1,tiers:[0.5,0.5],band:'gap',roof:0.55,roofKind:'membrane',env:'park',river:[-0.3,-1.6,-0.35],lights:'roof'},
 'METROPOLITANO':{n:2.4,nIn:4,kIn:1.14,T:1,B:1,L:1,R:1,tiers:[0.55,0.45],band:'gap',roof:0,env:'tropic',lights:'towers'},
 'ALLIANZ PARQUE':{n:6,nIn:14,T:0.95,B:0.85,L:0.85,R:0.85,tiers:[0.55,0.45],band:'fascia',roof:0.55,roofCol:'#e9ebee',env:'dense',facade:'glass',lights:'roof'},
 'NILTON SANTOS':{n:12,nIn:6,kIn:1.14,track:'#b5523b',T:1,B:1,L:0.8,R:0.8,tiers:[0.55,0.45],band:'fascia',roof:0.55,roofCol:'#e8e8e4',env:'city',lights:'roof',sup:'arches4'},
 'MORUMBIS':{n:2.2,nIn:3,kIn:1.18,T:1,B:1,L:1,R:1,tiers:[0.55,0.45],band:'gap',roof:0,env:'park',facade:'concrete',lights:'rim'},
 'ETIHAD STADIUM':{n:3.6,nIn:10,T:1,B:1,L:0.95,R:0.95,tiers:[0.38,0.33,0.29],band:'fascia',roof:0.5,roofCol:'#e8ebef',env:'plaza',lights:'roof',sup:'masts'},
 'EMIRATES STADIUM':{n:2.6,nIn:6,kIn:1.03,T:1,B:1,L:1,R:1,tiers:[0.38,0.33,0.29],band:'fascia',roof:0.5,roofKind:'glass',roofCol:'#b8c4cc',env:'city',facade:'glass',lights:'roof'},
 'ANFIELD':{n:14,nIn:14,corners:'half',T:1,B:0.75,L:0.8,R:0.75,tiers:[0.38,0.33,0.29],band:'fascia',sides:{L:{tiers:[1]}},roof:0.45,roofCol:'#c9ccd1',env:'terraced',lights:'roof'},
 'STAMFORD BRIDGE':{n:14,nIn:14,corners:'fill',T:0.75,B:0.7,L:0.65,R:0.65,tiers:[0.55,0.45],band:'fascia',roof:0.5,roofCol:'#b9bcc2',env:'dense',lights:'roof'},
 'OLD TRAFFORD':{n:14,nIn:14,corners:'fill',T:1,B:0.85,L:0.85,R:0.85,tiers:[0.38,0.33,0.29],band:'fascia',roof:0.42,roofCol:'#d0d3d8',env:'industrial',river:[0,-1.5,-0.3],lights:'roof',sup:'redtruss'},
 'TOTTENHAM HOTSPUR STADIUM':{n:5,nIn:12,T:1,B:1,L:1,R:0.9,tiers:[0.38,0.33,0.29],band:'fascia',sides:{L:{tiers:[1]}},roof:0.55,roofKind:'glass',roofCol:'#9aa4ad',env:'city',facade:'glass',lights:'roof'},
 "ST JAMES' PARK":{n:14,nIn:14,corners:'fill',T:1,B:0.5,L:1,R:0.45,tiers:[0.5,0.5],band:'fascia',sides:{B:{tiers:[1]},R:{tiers:[1]}},roof:{T:0.55,L:0.55,B:0.35,R:0.35},roofCol:'#e8e8e4',env:'city',lights:'roof',sup:'bigcanti'},
 'SANTIAGO BERNABÉU':{n:6,nIn:14,T:1,B:1,L:1,R:1,tiers:[0.38,0.33,0.29],band:'fascia',roof:0.62,roofKind:'retract',roofCol:'#b8bec6',env:'dense',facade:'ribbon',lights:'roof',screen:1},
 'SPOTIFY CAMP NOU':{n:2.35,nIn:4,kIn:1.06,T:1,B:1,L:1,R:1,tiers:[0.38,0.33,0.29],band:'fascia',roof:0,env:'city',facade:'concrete',lights:'poles',cranes:1},
 'METROPOLITANO@Madrid':{n:3,nIn:6,kIn:1.04,T:1,B:1,L:1,R:1,tiers:[0.55,0.45],band:'fascia',roof:0.6,roofKind:'membrane',env:'park',lights:'roof',sup:'cables'},
 'SAN MAMÉS':{n:5,nIn:14,T:1,B:0.9,L:0.95,R:0.95,tiers:[0.55,0.45],band:'fascia',roof:0.5,roofCol:'#f0f0ec',env:'city',river:[0,1.5,1.32],facade:'panels',lights:'roof'},
 'BENITO VILLAMARÍN':{n:6,nIn:14,T:1,B:0.9,L:0.95,R:0.95,tiers:[0.38,0.33,0.29],band:'fascia',roof:{T:0.45,B:0.4,L:0.35,R:0.2},roofCol:'#e8e8e4',env:'city',lights:'roof'},
 'SAN SIRO':{n:7,nIn:12,T:0.8,B:0.75,L:0.8,R:0.8,tiers:[0.38,0.33,0.29],band:'gap',roof:0.5,roofCol:'#4b525a',env:'parking',lights:'roof',towers11:1},
 'ALLIANZ STADIUM':{n:14,nIn:14,corners:'fill',T:0.95,B:0.85,L:0.85,R:0.85,tiers:[0.5,0.5],band:'fascia',roof:0.55,roofCol:'#e8e8e4',env:'park',lights:'roof',sup:'pylon2'},
 'DIEGO ARMANDO MARADONA':{n:2.4,nIn:4,kIn:1.18,track:'#2f6fc0',T:1,B:1,L:1,R:1,tiers:[0.5,0.5],band:'gap',roof:0.38,roofCol:'#d9dbdf',env:'dense',lights:'roof',sup:'truss'},
 'ALLIANZ ARENA':{n:3.2,nIn:12,T:1,B:1,L:1,R:1,tiers:[0.38,0.33,0.29],band:'fascia',sides:{L:{tiers:[0.6,0.4]}},roof:0.6,roofKind:'membrane',env:'plaza',facade:'cushion',lights:'roof'},
 'SIGNAL IDUNA PARK':{n:14,nIn:14,corners:'fill',T:1,B:0.85,L:1,R:0.85,tiers:[0.55,0.45],band:'fascia',sides:{L:{tiers:[1]}},roof:0.5,roofCol:'#9aa0a8',env:'park',lights:'roof',pylons:1},
 'PARC DES PRINCES':{n:2.7,nIn:6,kIn:1.03,T:1,B:1,L:1,R:1,tiers:[0.55,0.45],band:'gap',roof:0.5,roofCol:'#8d949d',env:'city',facade:'ribs',lights:'roof'},
 'ESTADIO AZTECA':{n:2.4,nIn:5,kIn:1.07,T:1,B:1,L:1,R:1,tiers:[0.55,0.45],band:'palcos',roof:0.38,roofKind:'glass',roofCol:'#8d949d',env:'parking',facade:'concrete',lights:'roof'},
 'ESTADIO DE YOKOHAMA':{n:2.4,nIn:4,kIn:1.18,track:'#b5523b',T:1,B:1,L:1,R:1,tiers:[0.5,0.5],band:'fascia',roof:{T:0.55,B:0.5,L:0.15,R:0.15},roofCol:'#e8e8e4',env:'park',lights:'roof',sup:'arches'},
 'ESTADIO DE LAS LEYENDAS':{n:3.5,nIn:8,T:1,B:1,L:1,R:1,tiers:[0.38,0.33,0.29],band:'palcos',roof:0.45,roofKind:'glass',roofCol:'#C9A227',env:'plaza',facade:'gold',lights:'roof'}
};
function geoOf(st){
 const g=GEO[st.n+'@'+st.c]||GEO[st.n];
 if(g)return g;
 const roofed=st.roof!=='none';
 const base=st.shape==='oval'?{n:2.4,nIn:4,kIn:st.track?1.18:1.08}:st.shape==='bowl'?{n:4,nIn:10}:st.shape==='cylinder'?{n:2,nIn:2,kIn:1.5,circle:1}:{n:14,nIn:14,corners:roofed?'fill':'open'};
 return Object.assign({T:0.9,B:0.85,L:0.85,R:0.85,tiers:st.tiers===3?[0.38,0.33,0.29]:[0.55,0.45],band:st.band||'fascia',roof:roofed?0.45:0,roofCol:st.roofCol,env:'city',lights:roofed?'roof':'towers',track:st.track},base);
}
const RGBC={};
function rgbOf(h){let v=RGBC[h];if(v)return v;const n=parseInt(h.slice(1),16);return RGBC[h]=[n>>16,(n>>8)&255,n&255];}
function hsh(a,b){let h=(Math.imul(a|0,374761393)+Math.imul(b|0,668265263))|0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296;}

function drawStadium(g,st,kits,topEdge,botEdge,W,H,xInL,xInR){
 const G=geoOf(st),seed=st.n.length*977+st.n.charCodeAt(1)*31;
 const yF=Math.floor(topEdge)-3,yB0=Math.ceil(botEdge+6);
 const cx=(xInL+xInR)/2,cy=(yF+yB0)/2,ax=(xInR-xInL)/2,ay=(yB0-yF)/2;
 const kIn=G.kIn||1,nIn=G.nIn||14,nOut=G.n||4;
 let inA={L:ax*kIn,R:ax*kIn,T:ay*kIn,B:ay*kIn};
 let outA={T:ay+yF*G.T,B:ay+(H-yB0)*G.B,L:ax+xInL*G.L,R:ax+(W-xInR)*G.R};
 if(G.circle){const R=Math.min(outA.T,outA.B*1.08)/0.74;outA={T:R*0.74,B:R*0.74*0.94,L:R,R:R};inA={T:ay*1.22,B:ay*1.22,L:ax*1.06,R:ax*1.06};}
 for(const k of ['T','B','L','R'])outA[k]=Math.max(outA[k],inA[k]+10);
 const rho=(A,c,s,n,nB)=>{const nn=s>0&&nB?nB:n;return Math.pow(Math.pow(Math.abs(c)/(c<0?A.L:A.R),nn)+Math.pow(Math.abs(s)/(s<0?A.T:A.B),nn),-1/nn);};
 const roofOf=sd=>(typeof G.roof==='number'?G.roof:((G.roof&&G.roof[sd])||0))*(sd==='T'?0.55:sd==='B'?0.7:0.8);
 const tiersOf=sd=>(G.sides&&G.sides[sd]&&G.sides[sd].tiers)||G.tiers;
 const roofKind=G.roofKind||'solid',rc=G.roofCol||'#d6d9de';
 const img=g.createImageData(W,H),D=img.data;
 const kind=new Uint8Array(W*H); // 0 afuera, 1 butaca, 2 pasillo/banda, 3 techo, 4 fachada, 5 apron/pista, 6 cancha
 const put=(i,c,f)=>{const k=i*4;let r=c[0],gg=c[1],b=c[2];if(f!==undefined&&f!==1){r*=f;gg*=f;b*=f;}D[k]=r;D[k+1]=gg;D[k+2]=b;D[k+3]=255;};
 const mixc=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
 const seats=st.seats.map(rgbOf);
 const RIS=rgbOf('#0b0e12'),STAIR=rgbOf('#4d555e'),BANDG=rgbOf('#5f6770'),BANDF=rgbOf('#14181d'),APRON=rgbOf('#173022'),PAVE=rgbOf('#34383d'),ROOF=rgbOf(rc),WHITE=[245,246,240];
 const envPal={boca:['#b8432f','#2f74b5','#e0b326','#2e9a52','#d4762a','#7d4b9e','#c9c9c2'],barrio:['#7a3d30','#8a5a3c','#5d4a3e','#6e6e66','#9a4c34'],terraced:['#6a3328','#5a2c24','#3d424a','#734034'],city:['#3d4047','#4b4f57','#5a554d','#33373d','#5e5047','#45484c'],dense:['#3a3d44','#51555e','#2c2f35','#5b5f68','#474a52'],industrial:['#3b3e43','#4f4a42','#2f3236','#5a5248']};
 const pal=k=>(envPal[k]||envPal.city).map(rgbOf);
 const PALE=pal(G.env);
 // ---- lo que rodea al estadio (de noche) ----
 const env=(x,y,dist)=>{
  const wx=x,wy=y*1.35,k=G.env;
  if(G.river){const[a,b,c]=G.river;if(a*x/W+b*y/H>c){const sh2=(Math.sin(x*0.35+y*1.7)+Math.sin(x*0.11-y*0.6))*0.5;return sh2>0.75?[40,78,110]:sh2>0.2?[18,44,72]:[11,30,52];}
   if(a*x/W+b*y/H>c-0.025)return[58,62,58];}
  if(G.highway&&Math.abs(y-(H-9))<5)return Math.abs(y-(H-9))<1?[200,180,90]:(x+Math.floor(y))%11===0?[255,240,200]:[36,38,42];
  if(k==='park'||k==='tropic'){const ci=Math.floor(wx/6),cj=Math.floor(wy/6),h=hsh(ci+seed,cj);
   const path=Math.abs(Math.sin(wx*0.02)*40+wy*0.5-((ci*7)%60))<1.4;if(path)return[92,88,74];
   if(h<0.55){const dx=wx-(ci*6+3),dy=wy-(cj*6+3),r=Math.hypot(dx,dy);if(r<2.8+h*2)return k==='tropic'?(r<1.2?[70,140,60]:[38,96,44]):(r<1.4?[46,96,52]:dx+dy<0?[34,78,42]:[22,56,32]);}
   return k==='tropic'?[34,62,34]:[20,42,27];}
  if(k==='plaza'){const t=((wx|0)%8===0||(wy|0)%8===0);const h=hsh(Math.floor(wx/16)+seed,Math.floor(wy/16));
   const lamp=((wx|0)%16===8&&(wy|0)%16===8);if(lamp)return[255,236,180];
   if(h<0.18){const dx=wx%16-8,dy=wy%16-8;if(dx*dx+dy*dy<9)return[30,70,40];}return t?[86,88,92]:[66,68,72];}
  if(k==='parking'){const bi=Math.floor(wy/9),row=wy%9;if(row<2)return[40,42,46];const lot=Math.floor(wx/4),h=hsh(lot+seed,bi);
   if((wx|0)%4===0)return[120,122,126];if(h<0.55&&row>2&&row<8){const cc=[[160,30,30],[30,60,140],[200,200,200],[50,50,55],[120,120,128],[180,150,40]][Math.floor(h*11)%6];return(row===3)?mixc(cc,[255,255,255],0.25):cc;}return[36,38,42];}
  // barrio / ciudad: manzanas y calles
  const BS=k==='dense'?20:k==='boca'||k==='barrio'||k==='terraced'?14:17,SW=2;
  const bx=Math.floor(wx/BS),by=Math.floor(wy/BS),lx=wx-bx*BS,ly=wy-by*BS;
  if(lx<SW||ly<SW){const lamp=(lx<SW&&(ly|0)%7===3&&lx<1)||(ly<SW&&(lx|0)%7===3&&ly<1);if(lamp)return[255,214,140];
   const car=hsh(Math.floor(wx/3)+seed,Math.floor(wy/3))<0.05;if(car)return hsh(wx|0,wy|0)<0.5?[255,250,220]:[220,40,40];return[24,26,30];}
  const lw=k==='terraced'?3:k==='dense'?8:5,lh=k==='terraced'?6:k==='dense'?9:5;
  const li=Math.floor((lx-SW)/lw),lj=Math.floor((ly-SW)/lh),h=hsh(bx*17+li+seed,by*13+lj);
  if(k!=='dense'&&k!=='terraced'&&h>0.93)return[28,64,36];
  let c=PALE[Math.floor(h*PALE.length)];
  const ex=(lx-SW)%lw,ey=(ly-SW)%lh;
  if(ex<0.8||ey<0.8)c=mixc(c,[0,0,0],0.45);else if(ex<1.8&&ey<1.8)c=mixc(c,[255,255,255],0.12);
  if(k==='dense'||k==='city'){if(hsh(wx|0,(wy|0)+seed)<0.04)return[255,226,150];}
  return c;};
 // ---- pixel por pixel ----
 const tierCache={};
 const farSpots=[];const S=[];const occ=new Uint8Array(Math.ceil(W/3)*Math.ceil(H/3));
 const farFront=new Int16Array(W).fill(-1),nearFront=new Int16Array(W).fill(H),Lfront=new Int16Array(H).fill(-1),Rfront=new Int16Array(H).fill(W);
 const bandYs=[];
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const i=y*W+x,dx=x+0.5-cx,dy=y+0.5-cy;
  if(Math.abs(dx)<=ax&&Math.abs(dy)<=ay){kind[i]=6;put(i,APRON);continue;}
  const r=Math.hypot(dx,dy),c=dx/r,s=dy/r;
  const ri=rho(inA,c,s,nIn),ro=rho(outA,c,s,nOut,G.nB);
  const end=Math.abs(dx)*ay>Math.abs(dy)*ax,sd=end?(dx<0?'L':'R'):(dy<0?'T':'B');
  if(r<ri){kind[i]=5;
   if(G.track){const tc=rgbOf(G.track),dd=ri-r;put(i,(dd|0)%3===0&&dd<10?mixc(tc,WHITE,0.45):tc,0.85);}
   else put(i,APRON,0.85);continue;}
  const d=r-ri,Dd=ro-ri,t=d/Dd;
  let outside=t>1;
  const cornerX=Math.abs(dx)-ax,cornerY=Math.abs(dy)-ay;
  if(!outside&&cornerX>2&&cornerY>2){
   if(G.corners==='open')outside=true;
   else if(G.corners==='half'&&((dx<0)!==(dy<0)))outside=true;}
  if(!outside&&G.gate&&sd===G.gate&&Math.abs(dy)<12&&t>0.08)outside=true;
  if(outside){
   // explanada alrededor y luego el barrio
   const dist=t>1?(r-ro):3;
   let c;if(t>1&&dist<3.5)c=PAVE;else c=env(x,y,dist);
   const lit=c[0]>200&&c[1]>180;const fog=lit?1:(0.42+0.22*Math.min(1,y/H*1.6));put(i,c,fog*(t>1&&dist<6&&!lit?0.85:1));kind[i]=0;continue;}
  // fachada (borde exterior)
  if(Dd-d<2.6&&G.facade!=='none'){kind[i]=4;
   const f=G.facade,along=end?y*1.6:x;let c;
   if(f==='cushion'){const q=Math.abs(((x+y*2)%10)-5)+Math.abs(((x-y*2+600)%10)-5);c=q<3?rgbOf('#ff8a9a'):q<6?rgbOf('#e0193b'):rgbOf('#9e0a24');}
   else if(f==='ribbon')c=((along|0)+(d|0))%3===0?[220,226,232]:[150,158,168];
   else if(f==='ribs')c=(along|0)%5<2?[205,200,190]:[90,88,84];
   else if(f==='mural')c=rgbOf(((along/9)|0)%2?'#F5C400':'#0A2D7A');
   else if(f==='panels')c=(along|0)%4===0?rgbOf(st.seats[0]):[236,236,232];
   else if(f==='glass')c=(along|0)%3===0?[120,170,200]:[60,90,110];
   else if(f==='gold')c=(along|0)%3===0?[240,210,120]:[160,130,50];
   else if(f==='stone')c=(along|0)%4===0?[150,140,120]:[196,186,160];
   else c=(along|0)%6===0?[110,114,118]:[150,152,150];
   put(i,c);continue;}
  // techo
  const rf=roofOf(sd);
  if(rf>0&&t>1-rf){kind[i]=3;const rd=Dd*(1-rf),dr=d-rd,along=end?y*1.6:x;
   let c;
   if(roofKind==='membrane'){c=mixc(mixc(seats[0],[0,0,0],0.5),[210,214,220],0.5);if((along|0)%9===0)c=[200,204,210];}
   else if(roofKind==='glass'){c=mixc(ROOF,[30,40,50],0.35);if((dr|0)%5===0)c=mixc(c,[255,255,255],0.25);}
   else if(roofKind==='retract'){c=(along|0)%7===0?mixc(ROOF,[0,0,0],0.4):ROOF;if((dr|0)%4===0)c=mixc(c,[0,0,0],0.2);}
   else{c=ROOF;if((dr|0)%4===0)c=mixc(c,[0,0,0],0.18);if((along|0)%14===0)c=mixc(c,[0,0,0],0.3);}
   if(dr<1.2)c=((along|0)%3===0)?[255,251,224]:[120,122,118]; // borde con luces
   else if(dr<2.4)c=mixc(c,[0,0,0],0.45);
   put(i,c,dr<1.2?1:roofKind==='membrane'?0.9:0.62);continue;}
  // Bombonera: el lado de los palcos es una pared vertical
  if(G.far==='palcos'&&sd==='T'){kind[i]=2;const yy=(d|0),xx=x;const row=yy%6,col=xx%8;
   let c;if(row>=1&&row<=3&&col>=1&&col<=6)c=((xx*7+yy*13)%11===0)?[255,244,176]:[255,210,58];else c=row===4?[6,26,71]:[10,45,122];
   if(t>0.94)c=[245,196,0];put(i,c);if(farFront[x]<y)farFront[x]=y;continue;}
  // bandejas
  const TS=tiersOf(sd),nT=TS.length,bandPx=G.band==='palcos'?5:3,usable=Dd-(nT-1)*bandPx;
  let acc=0,ti=-1,d0=0;
  for(let k=0;k<nT;k++){const h=TS[k]*usable;if(d<acc+h){ti=k;d0=d-acc;break;}acc+=h;if(k<nT-1){if(d<acc+bandPx){ti=-2;d0=d-acc;break;}acc+=bandPx;}}
  if(ti===-1){ti=nT-1;d0=d-acc;}
  if(ti===-2){kind[i]=2;const along=end?y*1.6:x;let c;
   if(G.band==='fascia'){c=d0<1?BANDF:((along|0)%3===0?rgbOf(kits[0].p):BANDF);if(d0>=1&&d0<2&&(along|0)%3!==0)c=[30,34,40];}
   else if(G.band==='palcos'){c=d0>1&&d0<4&&(along|0)%5<3?((along*13|0)%7===0?[255,241,184]:[127,168,200]):[29,36,44];}
   else c=d0<1?[125,133,142]:d0>=2?[48,54,61]:BANDG;
   put(i,c);if(sd==='T'&&Math.abs(x-W*0.25)<1)bandYs.push(y);continue;}
  kind[i]=1;
  const along=end?y*1.6:x,row=(d0/3)|0,pr=d0-row*3;
  if(((along+ti*13+500)|0)%46<3){put(i,STAIR,(y&1)?1:0.75);continue;}
  if(pr>=2){put(i,RIS);continue;}
  let base=seats[ti%seats.length];
  if(st.seatMode==='sectors')base=seats[Math.floor((Math.atan2(dy,dx)+Math.PI)/(Math.PI*2)*14)%seats.length];
  else if(st.seatMode==='stripes')base=seats[(Math.floor(Math.atan2(dy,dx*0.6)/(Math.PI*2)*18+20)+ti)%2===0?0:Math.min(1,seats.length-1)];
  put(i,base,pr<1?0.66:0.46);
  // borde de adentro de cada tribuna (para los trapos)
  if(sd==='T'&&y>farFront[x])farFront[x]=y;else if(sd==='B'&&y<nearFront[x])nearFront[x]=y;else if(sd==='L'&&x>Lfront[y])Lfront[y]=x;else if(sd==='R'&&x<Rfront[y])Rfront[y]=x;
  // lugar para un hincha
  if(pr<0.9){const oi=((y/3)|0)*Math.ceil(W/3)+((x/3)|0);if(!occ[oi]&&x>0&&x<W-2&&y>2){occ[oi]=1;
   const sec=sd==='L'?'barra':sd==='R'?'away':sd==='T'?'far':'near';
   if(!(G.cranes&&sd==='T'&&ti===nT-1))S.push([x,y,sec,ti,nT]);}}
 }
 g.putImageData(img,0,0);
 // ---- mosaico de butacas ----
 if(st.mosaic){const m=document.createElement('canvas');m.width=W;m.height=H;const mg=m.getContext('2d');mg.font='8px Silkscreen, monospace';mg.textAlign='center';mg.textBaseline='middle';mg.fillStyle='#fff';
  const mx=Math.round(W*0.3);let fy=-1;for(let y=0;y<yF;y++){const k=kind[y*W+mx];if(k===1){fy=y;break;}}
  mg.fillText(st.mosaic,mx,Math.round((fy+farFront[mx])/2)||Math.round(yF*0.55));
  const md=mg.getImageData(0,0,W,H).data,col=st.n.includes('CAMP')?'#F5C400':'#f4f4f2';g.fillStyle=col;for(let i=0;i<W*H;i++)if(md[i*4+3]>100&&kind[i]===1)g.fillRect(i%W,(i/W)|0,1,1);
  for(let k=S.length-1;k>=0;k--){const[x,y]=S[k];let hit=false;for(let ddx=0;ddx<2&&!hit;ddx++)for(let ddy=-1;ddy<2&&!hit;ddy++){if(md[((y+ddy)*W+x+ddx)*4+3]>100)hit=true;}if(hit){g.fillStyle=col;g.fillRect(x,y-1,2,2);S.splice(k,1);}}}
 // ---- estructuras (capa de arriba de la gente) ----
 const g0=g;{const oc=document.createElement('canvas');oc.width=W;oc.height=H;g=oc.getContext('2d');}
 const outPt=(c,s,extra)=>{const r=rho(outA,c,s,nOut,G.nB)+(extra||0);return[cx+c*r,cy+s*r];};
 const ang=(a)=>[Math.cos(a),Math.sin(a)];
 const line=(x0,y0,x1,y1,col)=>pline(g,Math.round(x0),Math.round(y0),Math.round(x1),Math.round(y1),col);
 const glow=(x,y,r,col)=>{g.save();g.globalCompositeOperation='lighter';for(let k=r;k>=1;k--){g.fillStyle=hexA(col,0.05);g.fillRect(Math.round(x-k),Math.round(y-k*0.7),k*2+1,Math.round(k*1.4)+1);}g.restore();};
 const diag=[[-ax,-ay],[ax,-ay],[-ax,ay],[ax,ay]].map(([a,b])=>{const l=Math.hypot(a,b);return[a/l,b/l];});
 const gN=g;g=g0;
 // vecino: el otro estadio de Avellaneda a 300 metros
 if(G.neighbor){const[u,v]=G.neighbor.at,nx=u*W,ny=v*H,R=G.neighbor.r;
  for(let y=Math.max(0,ny-R);y<Math.min(H,ny+R);y++)for(let x=Math.max(0,nx-R);x<Math.min(W,nx+R);x++){const q=Math.hypot((x-nx)/R,(y-ny)/(R*0.74));if(q>1||kind[y*W+x])continue;
   g.fillStyle=q>0.86?'#9aa0a8':q>0.5?((Math.floor(q*30))%2?G.neighbor.col:sh(G.neighbor.col,-0.5)):'#1e5a2e';g.fillRect(x,y,1,1);}}
 g=gN;
 // torres de iluminación en las esquinas
 if(G.lights==='towers'){for(const[c,s]of diag){const[px0,py0]=outPt(c,s,G.corners==='open'?-Math.min(ax,ay)*0.35:7);const up=s<0?16:9;
   g.fillStyle='#2b3036';g.fillRect(Math.round(px0)-1,Math.round(py0)-1,3,3);g.fillStyle='#6b737c';for(let k=0;k<up;k++){g.fillRect(Math.round(px0),Math.round(py0)-k,1,1);}
   const hx=Math.round(px0)-4,hy=Math.round(py0)-up-3;g.fillStyle='#1d2126';g.fillRect(hx,hy,9,4);g.fillStyle='#fffbe0';for(let k=0;k<4;k++){g.fillRect(hx+1+k*2,hy+1,1,2);}glow(hx+4,hy+2,9,'#fff3c4');}}
 else if(G.lights==='poles'){for(let a=0;a<Math.PI*2;a+=Math.PI/9){const[c,s]=ang(a);const[px0,py0]=outPt(c,s,-1);g.fillStyle='#8d949d';g.fillRect(Math.round(px0),Math.round(py0)-5,1,5);g.fillStyle='#fffbe0';g.fillRect(Math.round(px0)-1,Math.round(py0)-6,3,1);glow(px0,py0-6,4,'#fff3c4');}}
 else if(G.lights==='rim'){for(let a=0;a<Math.PI*2;a+=Math.PI/40){const[c,s]=ang(a);const[px0,py0]=outPt(c,s,-1.5);g.fillStyle='#fffbe0';g.fillRect(Math.round(px0),Math.round(py0),1,1);}}
 // soportes del techo
 const sup=G.sup;
 if(sup==='arch'){ // Wembley: el arco sobre la tribuna norte
  const xa=cx-outA.L*0.82,xb=cx+outA.R*0.82,base=cy-outA.T*0.55,top=2;
  for(let x=Math.round(xa);x<=xb;x++){const u=(x-(xa+xb)/2)/((xb-xa)/2),y=Math.round(base-(base-top)*(1-u*u));g.fillStyle='#3b4249';g.fillRect(x,y+2,1,1);g.fillStyle='#ffffff';g.fillRect(x,y,1,2);
   if(x%14===0){for(let yy=y+3;yy<cy-outA.T*0.7;yy+=2){g.fillStyle='rgba(230,235,240,0.35)';g.fillRect(x+Math.round((yy-y)*0.15),yy,1,1);}}}
  glow((xa+xb)/2,top+1,6,'#ffffff');}
 if(sup==='arches'||sup==='arches4'){ // arcos sobre las tribunas (Luz, Yokohama) o en las esquinas (Engenhão)
  const arcs=sup==='arches4'?[[cx-outA.L*0.95,cx-ax*0.1,cy-outA.T*0.7,-1],[cx+ax*0.1,cx+outA.R*0.95,cy-outA.T*0.7,-1],[cx-outA.L*0.95,cx-ax*0.1,cy+outA.B*0.85,1],[cx+ax*0.1,cx+outA.R*0.95,cy+outA.B*0.85,1]]
   :[[cx-ax*0.9,cx+ax*0.9,cy-outA.T*0.78,-1],[cx-ax*0.9,cx+ax*0.9,cy+outA.B*0.92,1]];
  for(const[a,b,yb,dir]of arcs){for(let x=Math.round(a);x<=b;x++){const u=(x-(a+b)/2)/((b-a)/2),y=Math.round(yb-(dir<0?10:5)*(1-u*u));g.fillStyle=sup==='arches4'?'#f4f4f2':'#d8282b';g.fillRect(x,y,1,2);}}}
 if(sup==='masts'){for(let k=0;k<12;k++){const a=k/12*Math.PI*2+0.13,[c,s]=ang(a),[px0,py0]=outPt(c,s,4),h=s<0?18:10;
   g.fillStyle='#e9ecef';g.fillRect(Math.round(px0),Math.round(py0)-h,2,h);g.fillStyle='#1f2d4a';g.fillRect(Math.round(px0)+2,Math.round(py0)-h,1,h);
   const[ix,iy]=outPt(c,s,-(rho(outA,c,s,nOut)-rho(inA,c,s,nIn))*0.5);line(px0,py0-h,ix,iy,'rgba(230,236,242,0.55)');line(px0,py0-h,(px0+ix)/2+6,(py0+iy)/2,'rgba(230,236,242,0.35)');}}
 if(sup==='needles'){for(let k=0;k<18;k++){const a=k/18*Math.PI*2,[c,s]=ang(a),[px0,py0]=outPt(c,s,-2);g.fillStyle='#f4f4f2';g.fillRect(Math.round(px0),Math.round(py0)-7,1,7);}}
 if(sup==='pylon2'){for(const s of [-1,1])for(const xx of [cx-ax*0.45,cx+ax*0.45]){const yy=s<0?cy-outA.T+2:cy+outA.B-2,h=s<0?20:10;g.fillStyle='#f4f4f2';g.fillRect(Math.round(xx),Math.round(yy)-h,2,h);
   for(let k=-3;k<=3;k++)if(k)line(xx,yy-h,xx+k*12,s<0?cy-outA.T*0.82:cy+outA.B*0.8,'rgba(255,255,255,0.45)');}}
 if(sup==='truss'||sup==='redtruss'||sup==='bigcanti'){const col=sup==='redtruss'?'rgba(214,40,40,0.75)':'rgba(255,255,255,0.45)';
  for(let x=Math.round(cx-ax);x<cx+ax;x+=sup==='bigcanti'?9:7){const yy=cy-outA.T+3;line(x,yy,x+3,yy+5,col);line(x+3,yy+5,x+7,yy,col);}
  if(sup==='redtruss'){g.fillStyle='#c81d25';g.fillRect(Math.round(cx-ax),Math.round(cy-outA.T+2),Math.round(ax*2),1);}}
 if(sup==='cables'){for(let x=Math.round(cx-ax*0.9);x<cx+ax*0.9;x+=16){line(x,cy-outA.T+1,x+8,cy-outA.T*0.78,'rgba(220,225,230,0.5)');line(x,cy+outA.B-1,x+8,cy+outA.B*0.86,'rgba(220,225,230,0.4)');}}
 if(G.towers11){ // San Siro: las 11 torres de rampas y las vigas rojas del techo
  const tw=[];for(let k=0;k<4;k++){const[c,s]=diag[k];tw.push(outPt(c,s,3));}
  for(const a of [-1.9,-1.25,-0.45,0.35,1.25,1.95,2.75]){const[c,s]=ang(a);tw.push(outPt(c,s,4));}
  for(const[x0,y0]of tw){const R=7;for(let yy=-R;yy<=R;yy++)for(let xx=-R;xx<=R;xx++){const q=Math.hypot(xx,yy*1.3);if(q>R)continue;g.fillStyle=q>R-1.2?'#1d2024':q<2?'#0c0e10':((Math.atan2(yy,xx)*2+q*0.9)|0)%2?'#d5d8dc':'#7d848c';g.fillRect(Math.round(x0+xx),Math.round(y0+yy),1,1);}g.fillStyle='#fffbe0';g.fillRect(Math.round(x0),Math.round(y0-R*0.77),1,1);}
  const beam=(x0,y0,x1,y1)=>{for(let k=-1;k<=1;k++){const v=Math.abs(x1-x0)>Math.abs(y1-y0);line(x0+(v?0:k),y0+(v?k:0),x1+(v?0:k),y1+(v?k:0),k?'#7a0f14':'#d8262e');}};
  const bx0=cx-outA.L*0.82,bx1=cx+outA.R*0.82,by0=cy-outA.T*0.88,by1=cy+outA.B*0.86;beam(bx0,by0,bx1,by0);beam(bx0,by1,bx1,by1);beam(bx0,by0,bx0,by1);beam(bx1,by0,bx1,by1);
  for(let x=Math.round(cx-outA.L*0.8);x<cx+outA.R*0.8;x+=12){line(x,cy-outA.T*0.86,x+6,cy-outA.T*0.7,'rgba(200,29,37,0.8)');line(x,cy+outA.B*0.86,x+6,cy+outA.B*0.74,'rgba(200,29,37,0.8)');}}
 if(G.pylons){ // Signal Iduna Park: 8 pilones amarillos afuera, con los cables al techo
  for(const s of [-1,1])for(const f of [-0.75,-0.25,0.25,0.75]){const xx=cx+f*ax*1.15,yy=s<0?cy-outA.T*0.9:cy+outA.B-1,h=s<0?14:9,y0=Math.round(yy);
   g.fillStyle='#FDE100';g.fillRect(Math.round(xx)-1,y0-h,3,h);g.fillStyle='#b39d00';g.fillRect(Math.round(xx)+1,y0-h,1,h);
   for(const k of [-8,0,8])line(xx,y0-h,xx+k,s<0?cy-outA.T*0.84:cy+outA.B*0.84,'rgba(253,225,0,0.6)');}}
 if(G.tower){ // Centenario: la Torre de los Homenajes sobre la tribuna Olímpica
  const tx=Math.round(cx-ax*0.6),ty0=Math.round(cy-outA.T*0.6);g.fillStyle='#e8e4d8';g.fillRect(tx-3,0,7,ty0);g.fillStyle='#b9b4a6';for(let y=3;y<ty0;y+=5)g.fillRect(tx-3,y,7,1);g.fillStyle='#8f8a7c';g.fillRect(tx+3,0,1,ty0);
  g.fillStyle='#5CBFEB';g.fillRect(tx-1,1,3,3);glow(tx,2,5,'#bfe9ff');}
 if(G.cranes){for(const fx0 of [0.3,0.66]){const xx=Math.round(W*fx0),y1=Math.round(cy-outA.T*0.75);g.fillStyle='#e8b400';
   for(let y=0;y<y1;y++){g.fillRect(xx,y,1,1);g.fillRect(xx+3,y,1,1);if(y%3===0)g.fillRect(xx+1,y,2,1);}g.fillRect(xx-34,2,64,1);g.fillRect(xx-34,4,64,1);for(let x=xx-34;x<xx+30;x+=3)g.fillRect(x,3,1,1);
   g.fillStyle='#ff3b30';g.fillRect(xx+28,1,2,2);line(xx+20,5,xx+20,22,'rgba(200,200,200,0.6)');}}
 if(G.gate){const side=G.gate==='R'?1:-1,gx=Math.round(cx+side*(outA.R*0.94)),gy=Math.round(cy);g.fillStyle='#c9c2ad';g.fillRect(gx-4,gy-14,4,8);g.fillRect(gx-4,gy+6,4,8);g.fillStyle='#8a836f';g.fillRect(gx-4,gy-14,1,8);g.fillRect(gx-4,gy+6,1,8);}
 if(G.screen){g.fillStyle='#05070a';const yy=Math.round(cy-outA.T*(1-roofOf('T'))+1);for(let x=Math.round(cx-ax*0.95);x<cx+ax*0.95;x++){g.fillRect(x,yy,1,2);if(x%2===0){g.fillStyle=(Math.floor(x/30)%2)?'#ffffff':'#7fd0ff';g.fillRect(x,yy,1,1);g.fillStyle='#05070a';}}}
 // nombre del estadio y lema (los dibuja drawTrapos sobre la banda de la tribuna de enfrente)
 stadPlates=null;
 if(G.far!=='palcos'){const by=bandYs.length?bandYs[0]+1:Math.max(8,Math.round((farFront[Math.round(W*0.25)]||yF)*0.6));
  stadPlates={ny:by,acc:lum(st.seats[0])<70||lum(st.seats[0])>200?'#ffd27a':st.seats[0]};}
 else{const ty=Math.round((cy-outA.T+farFront[Math.round(W*0.27)])/2);for(const[xx,tx]of [[W*0.27,'LA BOMBONERA'],[W*0.73,'LA 12']]){g0.font='8px Silkscreen, monospace';const w=Math.ceil(g0.measureText(tx).width)+10;g0.fillStyle='#0A2D7A';g0.fillRect(Math.round(xx-w/2),ty-6,w,12);g0.fillStyle='#F5C400';g0.fillRect(Math.round(xx-w/2),ty-6,w,1);g0.fillRect(Math.round(xx-w/2),ty+5,w,1);pxText(g0,tx,Math.round(xx),ty,'#F5C400','#000');}}
 // frentes de las tribunas, por columna/fila (para colgar los trapos)
 for(let x=0;x<W;x++){if(farFront[x]<0)farFront[x]=yF;if(nearFront[x]>=H)nearFront[x]=yB0;}
 for(let y=0;y<H;y++){if(Lfront[y]<0)Lfront[y]=xInL;if(Rfront[y]>=W)Rfront[y]=xInR;}
 stadLayout={S,yF,yB0,xInL,xInR,roofB:Math.round(cy-outA.T),farFront,nearFront,Lfront,Rfront,kind,over:g.canvas};
 return stadLayout;
}

// capas de la hinchada (quieta y saltando) a partir de los lugares del estadio
function buildCrowd(st,kits,topEdge,botEdge,W,H){
 const L=stadLayout,rnd=srnd(kits[0].p.length*31+st.n.length*7+parseInt(kits[0].p.slice(1),16)%997);
 const mk=()=>{const c=document.createElement('canvas');c.width=W;c.height=H;return c;};
 const A=mk(),B=mk(),ga=A.getContext('2d'),gb=B.getContext('2d');
 const home=[],away=[],barra=[];
 const alt=k=>k.s===k.p?(lum(k.p)>150?'#16161B':'#F4F4F2'):k.s;
 const shirt=(k,r,x,y,dense)=>{const zone=(Math.sin(x*0.07+y*0.3)+Math.sin(x*0.023-y*0.11))*0.5,v=r();
  if(v<(dense?0.03:0.07))return v<0.035?'#e8e8e2':'#1b1d22';return zone>0.35?alt(k):(zone<-0.55&&v<0.5?k.shorts:k.p);};
 const fan=(x,y,k,r,dense)=>{
  const sk=CROWD_SKIN[Math.floor(r()*CROWD_SKIN.length)],c=shirt(k,r,x,y,dense),dk=sh(c,-0.3),arm=r()<(dense?0.6:0.35);
  ga.fillStyle=sk;ga.fillRect(x,y-1,1,1);ga.fillStyle=c;ga.fillRect(x,y,2,1);ga.fillStyle=dk;ga.fillRect(x,y+1,2,1);
  gb.fillStyle=sk;gb.fillRect(x,y-2,1,1);gb.fillStyle=c;gb.fillRect(x,y-1,2,1);gb.fillStyle=dk;gb.fillRect(x,y,2,1);if(arm){gb.fillStyle=c;gb.fillRect(x-1,y-3,1,2);gb.fillRect(x+2,y-3,1,2);}
 };
 for(const[x,y,sec,t]of L.S){
  const tierFill=[0.72,0.55,0.42];
  const fill=sec==='barra'?0.95:sec==='away'?0.82:sec==='far'?tierFill[Math.min(2,t)]:0.58;
  if(rnd()>fill)continue;
  const isAway=sec==='away';fan(x,y,isAway?kits[1]:kits[0],rnd,sec==='barra');
  (isAway?away:sec==='barra'?barra:home).push([x,y]);
 }
 // banderas: muchas en la popular local, algunas en la visitante y en las tribunas
 const flags=[];
 const pick=(arr,n,k,w,h)=>{for(let i=0;i<n&&arr.length;i++){const s=arr[Math.floor(rnd()*arr.length)];flags.push({x:s[0],y:s[1]-4,w,h,k,ph:rnd()*6});}};
 pick(barra,7,kits[0],9,6);pick(away,3,kits[1],9,6);pick(home.filter(s=>s[1]<L.yF),4,kits[0],12,7);pick(home.filter(s=>s[1]>L.yB0),3,kits[0],12,6);
 return{A,B,home,away,barra,flags,W,H};
}

// trapos colgados del alambrado (van arriba de la gente), siguiendo el frente de cada tribuna
function drawTrapos(g,st,teams,kits,topEdge,botEdge,W){
 const L=stadLayout;if(L.over)g.drawImage(L.over,0,0);
 const cl=x=>Math.max(0,Math.min(W-1,Math.round(x)));
 const fTop=(x,w)=>{let m=-1;for(let i=x;i<x+w;i++)m=Math.max(m,L.farFront[cl(i)]);return m-7;};
 const fBot=(x,w)=>{let m=1e9;for(let i=x;i<x+w;i++)m=Math.min(m,L.nearFront[cl(i)]);return m+1;};
 const altc=k=>k.s===k.p?(lum(k.p)>150?'#16161B':'#F4F4F2'):k.s;
 const stripes=(x,w,h,yy,k)=>{for(let i=0;i<w;i++){g.fillStyle=Math.floor(i/4)%2?k.p:altc(k);g.fillRect(x+i,yy,1,h);}g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x,yy+h-1,w,1);};
 const cloth=(x,w,yy,k,txt)=>{const h=10;g.fillStyle=k.p;g.fillRect(x,yy,w,h);g.fillStyle=altc(k);g.fillRect(x,yy,w,1);g.fillRect(x,yy+h-1,w,1);
  g.font='8px Silkscreen, monospace';g.textAlign='center';g.textBaseline='middle';g.fillStyle=lum(k.p)>150?'#16161B':'#F4F4F2';g.fillText(txt,x+w/2,yy+h/2+1);};
 const vcloth=(x,yy,h,k)=>{for(let j=0;j<h;j++){g.fillStyle=Math.floor(j/4)%2?k.p:altc(k);g.fillRect(x,yy+j,5,1);}};
 if(stadPlates){const ny=stadPlates.ny;
  const plate=(x,txt,col)=>{g.font='8px Silkscreen, monospace';const w=Math.ceil(g.measureText(txt).width)+8;g.fillStyle='rgba(5,7,10,0.92)';g.fillRect(Math.round(x-w/2),ny-5,w,10);g.fillStyle=col;g.fillRect(Math.round(x-w/2),ny-5,w,1);g.fillRect(Math.round(x-w/2),ny+4,w,1);pxText(g,txt,x,ny,col,'#000');};
  plate(Math.round(W*0.25),st.n,stadPlates.acc);plate(Math.round(W*0.75),st.motto||st.c.toUpperCase(),'#f3f0e2');}
 const nm=teams[0].name.toUpperCase().split(' ')[0];
 const X0=Math.round(L.xInL)+14,X1=Math.round(L.xInR)-14;
 cloth(X0,70,fTop(X0,70),kits[0],nm);stripes(X0+76,22,6,fTop(X0+76,22)+2,kits[0]);cloth(X0+104,58,fTop(X0+104,58),kits[0],st.motto&&st.motto.length<10?st.motto:'VAMOS');
 cloth(X1-136,66,fTop(X1-136,66),kits[0],teams[0].abbr);stripes(X1-64,30,6,fTop(X1-64,30)+2,kits[0]);
 cloth(X0+10,64,fBot(X0+10,64),kits[0],teams[0].abbr);stripes(X0+80,30,6,fBot(X0+80,30)+2,kits[0]);cloth(X1-130,90,fBot(X1-130,90),kits[0],'DALE '+nm.slice(0,8));stripes(X1-34,26,6,fBot(X1-34,26)+2,kits[0]);
 // trapos verticales en las cabeceras: la popular local y la visitante
 for(let i=0;i<4;i++){const yy=L.yF+12+i*40;vcloth(L.Lfront[cl(yy+15)]-5,yy,30,kits[0]);}
 for(let i=0;i<3;i++){const yy=L.yF+18+i*50;vcloth(L.Rfront[cl(yy+15)]+1,yy,30,kits[1]);}
}

/* ---------- efectos de tribuna ---------- */
const party={flares:[],smoke:[],hype:0.25,next:8,beatT:0,chant:0};
function resetParty(){party.flares.length=0;party.smoke.length=0;party.hype=0.3;party.next=10+Math.random()*10;party.chant=0;}
function pickSpot(team){if(!crowd)return null;const L=team===1?crowd.away:(crowd.barra.length&&Math.random()<0.65?crowd.barra:crowd.home);if(!L.length)return null;return L[Math.floor(Math.random()*L.length)];}
function addFlare(team,n,col){for(let i=0;i<n;i++){const s=pickSpot(team);if(!s)return;party.flares.push({x:s[0],y:s[1]-1,t:-Math.random()*1.2,ttl:5+Math.random()*4,col:col||(Math.random()<0.8?'r':'g')});}}
function addSmoke(team,n,col){for(let i=0;i<n;i++){const s=pickSpot(team);if(!s)return;for(let k=0;k<6;k++)party.smoke.push({x:s[0]+(Math.random()-0.5)*6,y:s[1],vx:(Math.random()-0.5)*4+3,vy:-(3+Math.random()*5),r:2+Math.random()*2,t:-k*0.25-Math.random(),ttl:4+Math.random()*2,col});}if(party.smoke.length>260)party.smoke.splice(0,party.smoke.length-260);}
function papelitos(team,n){
 if(!crowd)return;const k=game.kits[team===1?1:0];const cols=['#ffffff','#f3f0e2',k.p,k.s===k.p?'#ffffff':k.s,'#ffffff'];
 for(let i=0;i<n;i++){const s=pickSpot(team);if(!s)break;fx.confetti.push({x:s[0]+(Math.random()-0.5)*10,y:s[1]-6-Math.random()*20,vx:(Math.random()-0.5)*16,vy:-(4+Math.random()*16),col:cols[Math.floor(Math.random()*cols.length)],t:0,ttl:2.4+Math.random()*2.6,paper:1});}
 if(fx.confetti.length>900)fx.confetti.splice(0,fx.confetti.length-900);
}
function crowdEvent(kind,team){
 if(!crowd||!game||game.demo)return;
 if(kind==='goal'){CH.force=team===0?'gol':'silbidos';if(CH.song&&CH.song.kind!=='gol')CH.song.dur=0;}
 if(kind==='kickoff'){party.hype=0.9;CH.cool=2.5;addFlare(0,7);addFlare(1,3);addSmoke(0,3,game.kits[0].p);addSmoke(1,1,game.kits[1].p);papelitos(0,260);papelitos(1,70);}
 else if(kind==='goal'){party.hype=1;addFlare(team,team===1?5:9);addSmoke(team,2,game.kits[team].p);papelitos(team,team===1?120:240);}
 else if(kind==='chance'){party.hype=Math.min(1,party.hype+0.35);}
 else if(kind==='save'){party.hype=Math.min(1,party.hype+0.25);}
}
function updateParty(dt){
 if(!crowd||!game)return;
 party.hype=Math.max(0.22,party.hype-dt*0.09);
 party.next-=dt;if(party.next<=0&&!game.demo){party.next=14+Math.random()*16;const t=Math.random()<0.75?0:1;addFlare(t,1+Math.floor(Math.random()*2));if(Math.random()<0.4)addSmoke(t,1,game.kits[t].p);}
 for(let i=party.flares.length-1;i>=0;i--){const f=party.flares[i];f.t+=dt;if(f.t>f.ttl){party.flares.splice(i,1);continue;}if(f.t>0&&Math.random()<dt*9)party.smoke.push({x:f.x+(Math.random()-0.5)*2,y:f.y-1,vx:3+Math.random()*3,vy:-(4+Math.random()*4),r:1.5,t:0,ttl:2.5+Math.random()*1.5,col:f.col==='g'?'#b8f0b2':'#e8c4bc'});}
 for(let i=party.smoke.length-1;i>=0;i--){const m=party.smoke[i];m.t+=dt;if(m.t>m.ttl){party.smoke.splice(i,1);continue;}if(m.t>0){m.x+=m.vx*dt;m.y+=m.vy*dt;m.r+=dt*2.2;}}
}
// dibuja la hinchada (saltando en olas según la emoción), banderas, bengalas y humo
function drawStands(c,now){
 if(!crowd)return;
 if(!crowd.F){crowd.F=document.createElement('canvas');crowd.F.width=crowd.W;crowd.F.height=crowd.H;crowd.fg=crowd.F.getContext('2d');crowd.ft=-1;}
 const fr=Math.floor(now*20);
 if(fr!==crowd.ft){crowd.ft=fr;const g=crowd.fg,W=crowd.W,H=crowd.H,L=stadLayout||{xInL:0,xInR:W,yF:H,yB0:0};
  const x0=L.xInL+2,x1=L.xInR-2,yT=Math.min(H,L.yF+4),yB=Math.max(0,L.yB0-5);
  if(pitch)g.drawImage(pitch,0,0);else g.clearRect(0,0,W,H);
  const h=party.hype,sp=4+6*h,thr=0.85-1.3*h;
  for(let x=0;x<W;x+=4){
   const w=Math.sin(x*0.045-now*sp)+0.35*Math.sin(x*0.13+now*2.3),src=w>thr?crowd.B:crowd.A;
   if(x+4<=x0||x>=x1)g.drawImage(src,x,0,4,H,x,0,4,H);
   else{g.drawImage(src,x,0,4,yT,x,0,4,yT);g.drawImage(src,x,yB,4,H-yB,x,yB,4,H-yB);}
  }
  if(crowd.T)g.drawImage(crowd.T,0,0);
  for(const f of crowd.flags){
   const k=f.k,alt=k.s===k.p?(lum(k.p)>150?'#16161B':'#F4F4F2'):k.s;
   g.fillStyle='#d9d9d9';g.fillRect(f.x-1,f.y-2,1,f.h+5);
   for(let i=0;i<f.w;i++){const dy=Math.round(Math.sin(now*6+f.ph+i*0.5)*(1+h));g.fillStyle=Math.floor(i/3)%2?k.p:alt;g.fillRect(f.x+i,f.y+dy,1,f.h);}
  }
 }
 c.drawImage(crowd.F,0,0);
 for(const m of party.smoke){if(m.t<0)continue;const a=0.42*(1-m.t/m.ttl)*Math.min(1,m.t*3);c.fillStyle=hexA(m.col,a);const r=Math.round(m.r);c.fillRect(Math.round(m.x-r),Math.round(m.y-r*0.7),r*2,Math.max(1,Math.round(r*1.4)));c.fillRect(Math.round(m.x-r*0.6),Math.round(m.y-r),Math.round(r*1.2),r*2);}
 c.save();c.globalCompositeOperation='lighter';
 for(const f of party.flares){if(f.t<0)continue;const fl=0.7+0.3*Math.sin(now*40+f.x),col=f.col==='g'?[90,255,120]:[255,90,40];
  const up=Math.min(1,f.t*2)*(f.t>f.ttl-0.8?(f.ttl-f.t)/0.8:1);
  for(let r=11;r>=2;r-=1){c.fillStyle=`rgba(${col[0]},${col[1]},${col[2]},${0.06*fl*up})`;c.fillRect(Math.round(f.x-r),Math.round(f.y-r*0.8),r*2+1,Math.round(r*1.6)+1);}
  c.fillStyle=f.col==='g'?'#eaffe4':'#fffbe8';c.fillRect(Math.round(f.x),Math.round(f.y)-2,1,3);c.fillStyle=f.col==='g'?'#5aff78':'#ff7a2a';c.fillRect(Math.round(f.x)-1,Math.round(f.y)-1,3,2);
  if(Math.random()<0.5){c.fillStyle='#ffd27a';c.fillRect(Math.round(f.x+(Math.random()-0.5)*4),Math.round(f.y-3-Math.random()*3),1,1);}}
 c.restore();
}

/* ---------- cantitos: la hinchada canta según la región del club y cómo va el partido ----------
   Todo sintetizado: coro (sierras desafinadas con filtro de vocal), bombo, redoblante, trompeta, surdo, tamborim,
   aplausos y silbidos. Las melodías son propias. */
const CH={master:null,song:null,cool:4,force:null,last:''};
function chantStyle_fut(t){if(!t)return'eur';if(['bra','fla','pal','bot','sao'].includes(t.id))return'samba';if(t.cat==='arg'||['arg','uru','col'].includes(t.id))return'rio';return'eur';}
function chOut(){const a=AC;if(!CH.master){CH.master=a.createGain();CH.master.gain.value=0;CH.master.connect(a.destination);}return CH.master;}
// una nota del coro: muchas voces apenas desafinadas, con forma de vocal
function chVoice(t,midi,dur,vol,vowel){const a=AC,f=440*Math.pow(2,(midi-69)/12),out=chOut();
 const bp=a.createBiquadFilter();bp.type='bandpass';bp.frequency.value=vowel==='a'?900:vowel==='e'?1300:620;bp.Q.value=1.1;
 const lp=a.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2200;const g=a.createGain();
 g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(vol,t+0.05);g.gain.setValueAtTime(vol,t+Math.max(0.06,dur-0.08));g.gain.linearRampToValueAtTime(0.0001,t+dur);
 bp.connect(lp).connect(g).connect(out);
 for(let i=0;i<5;i++){const o=a.createOscillator();o.type='sawtooth';o.frequency.value=f*(1+(i-2)*0.006+(Math.random()-0.5)*0.004)*(i===4?0.5:1);o.connect(bp);o.start(t);o.stop(t+dur+0.02);}}
function chTone(t,f0,f1,dur,type,vol){const a=AC,o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+dur);
 g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);o.connect(g).connect(chOut());o.start(t);o.stop(t+dur+0.02);}
let chNoiseBuf=null;
function chNoise(t,dur,vol,freq,type){const a=AC;if(!chNoiseBuf){const n=a.sampleRate;chNoiseBuf=a.createBuffer(1,n,a.sampleRate);const d=chNoiseBuf.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;}
 const s=a.createBufferSource();s.buffer=chNoiseBuf;const f=a.createBiquadFilter();f.type=type||'bandpass';f.frequency.value=freq;const g=a.createGain();
 g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);s.connect(f).connect(g).connect(chOut());s.start(t,Math.random()*0.5);s.stop(t+dur+0.02);}
const bombo=(t,v)=>{chTone(t,82,44,0.22,'sine',0.3*v);chNoise(t,0.05,0.08*v,160);};
const redo=(t,v)=>chNoise(t,0.09,0.11*v,2600,'highpass');
const trompeta=(t,midi,dur,v)=>{const a=AC,f=440*Math.pow(2,(midi-69)/12),o=a.createOscillator(),g=a.createGain(),lp=a.createBiquadFilter();o.type='square';o.frequency.value=f;
 const lfo=a.createOscillator(),lg=a.createGain();lfo.frequency.value=5.5;lg.gain.value=f*0.012;lfo.connect(lg).connect(o.frequency);lp.type='lowpass';lp.frequency.value=1800;
 g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(0.045*v,t+0.03);g.gain.setValueAtTime(0.045*v,t+dur-0.06);g.gain.linearRampToValueAtTime(0.0001,t+dur);
 o.connect(lp).connect(g).connect(chOut());o.start(t);o.stop(t+dur+0.02);lfo.start(t);lfo.stop(t+dur+0.02);};
const surdo=(t,v)=>chTone(t,70,52,0.3,'sine',0.32*v);
const tamborim=(t,v)=>chNoise(t,0.03,0.07*v,4200,'highpass');
const aplauso=(t,v)=>{for(let i=0;i<6;i++)chNoise(t+Math.random()*0.03,0.05,0.05*v,1800+Math.random()*1200);};
const silbido=(t,v)=>{const a=AC,o=a.createOscillator(),g=a.createGain(),f=2200+Math.random()*1300;o.type='sine';o.frequency.setValueAtTime(f,t);o.frequency.linearRampToValueAtTime(f*(0.92+Math.random()*0.16),t+0.6);
 g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(0.018*v,t+0.08);g.gain.linearRampToValueAtTime(0.0001,t+0.7);o.connect(g).connect(chOut());o.start(t);o.stop(t+0.75);};
// canciones: [nota MIDI o null para silencio, duración en tiempos, vocal]
const SONGS={
 fiesta:{bpm:132,mel:[[67,1,'o'],[67,1,'e'],[69,1,'o'],[67,1,'e'],[72,2,'o'],[71,2,'a'],[67,1,'o'],[67,1,'e'],[69,1,'o'],[67,1,'e'],[74,2,'o'],[72,2,'a']]},
 aliento:{bpm:118,mel:[[64,1,'a'],[64,1,'e'],[67,2,'a'],[64,1,'o'],[62,1,'e'],[60,2,'a'],[62,1,'a'],[64,1,'e'],[65,2,'o'],[64,2,'a']]},
 oh:{bpm:96,mel:[[62,2,'o'],[62,2,'o'],[66,2,'o'],[69,4,'o'],[67,2,'o'],[66,2,'o'],[64,4,'o']]},
 gol:{bpm:150,mel:[[72,1,'o'],[72,1,'e'],[72,1,'o'],[72,1,'e'],[76,2,'a'],[74,2,'o'],[72,1,'o'],[72,1,'e'],[72,1,'o'],[72,1,'e'],[79,4,'a']]}
};
function chantStart(kind){
 const s=game.state,style=chantStyle(game.teams[0]);
 let mel=kind==='gol'?'gol':kind==='fiesta'?(style==='eur'?'oh':'fiesta'):kind==='aliento'?(style==='eur'?'oh':'aliento'):null;
 const S=mel?SONGS[mel]:{bpm:120,mel:[]},beat=60/S.bpm,reps=kind==='gol'?2:kind==='silbidos'?0:2;
 const dur=kind==='silbidos'?3.2:S.mel.reduce((a,n)=>a+n[1],0)*beat*reps;
 CH.song={kind,style,S,beat,reps,t0:AC.currentTime+0.05,dur,ni:0,rep:0,nextNote:AC.currentTime+0.05,nextBeat:AC.currentTime+0.05,bi:0};CH.last=kind;
}
function chantTick(dt,active){
 const a=AC;if(!a||!game||game.demo)return;
 const out=chOut();out.gain.setTargetAtTime(!active||muted?0:0.55+0.45*party.hype,a.currentTime,0.3);
 if(!active||muted){CH.song=null;return;}
 const s=game.state,now=a.currentTime;
 if(!CH.song){
  CH.cool-=dt;
  if(CH.force){const k=CH.force;CH.force=null;chantStart(k);}
  else if(CH.cool<=0&&s.phase==='play'){
   const diff=s.score[0]-s.score[1],late=!s.golden&&s.clock<s.duration*0.35;
   let k=diff>0?'fiesta':diff<0&&late&&CH.last!=='silbidos'?'silbidos':'aliento';
   if(diff===0&&party.hype<0.35&&Math.random()<0.4)k='aliento';
   chantStart(k);
  }
  if(!CH.song)return;
 }
 const C=CH.song,v=0.6+0.5*party.hype;
 if(now>C.t0+C.dur+0.1){CH.song=null;CH.cool=7+Math.random()*7;return;}
 // percusión según la región (un poco adelantada para que suene a tiempo)
 while(C.nextBeat<now+0.18&&C.nextBeat<C.t0+C.dur){const t=C.nextBeat,i=C.bi++,b=C.beat/2;
  if(C.kind==='silbidos'){if(i%2===0)for(let k=0;k<3;k++)silbido(t+Math.random()*0.2,v);if(i%4===0)bombo(t,0.6*v);}
  else if(C.style==='rio'){if(i%4===0||i%4===3||i%8===6)bombo(t,v);if(i%2===1)redo(t,0.8*v);}
  else if(C.style==='samba'){if(i%4===0)surdo(t,v);if(i%4===2)surdo(t,0.6*v);tamborim(t,i%2?0.5*v:v);if(i%4===3)tamborim(t+b/2,0.6*v);}
  else{if(i%4===0||i%4===1||(i%8===2))aplauso(t,v);}
  C.nextBeat+=b;}
 // melodía del coro (y la trompeta en el Río de la Plata)
 if(C.kind!=='silbidos')while(C.nextNote<now+0.18&&C.rep<C.reps){const n=C.S.mel[C.ni],t=C.nextNote,d=n[1]*C.beat;
  if(n[0]!=null){chVoice(t,n[0],d*0.92,0.022*v,n[2]);chVoice(t,n[0]-12,d*0.92,0.012*v,n[2]);if(C.style==='rio'&&C.rep>0)trompeta(t,n[0]+12,d*0.9,v);}
  C.nextNote+=d;C.ni++;if(C.ni>=C.S.mel.length){C.ni=0;C.rep++;}}
}

/* ---------- sonido de cancha: murmullo según la emoción y cantitos ---------- */
const crowdAudio={src:null,gain:null,filt:null,last:0};
function updateCrowdAudio(dt,active){
 const a=AC;if(!a)return;
 if(!crowdAudio.src){
  try{const n=a.sampleRate*2,buf=a.createBuffer(1,n,a.sampleRate),d=buf.getChannelData(0);let v=0;for(let i=0;i<n;i++){v=v*0.97+(Math.random()*2-1)*0.3;d[i]=v;}
   const src=a.createBufferSource();src.buffer=buf;src.loop=true;const f=a.createBiquadFilter();f.type='bandpass';f.frequency.value=520;f.Q.value=0.6;const g=a.createGain();g.gain.value=0;src.connect(f).connect(g).connect(a.destination);src.start();crowdAudio.src=src;crowdAudio.gain=g;crowdAudio.filt=f;}catch(e){return;}
 }
 const target=(!active||muted)?0:0.05+0.16*party.hype;
 crowdAudio.gain.gain.setTargetAtTime(target,a.currentTime,0.4);
 crowdAudio.filt.frequency.setTargetAtTime(420+500*party.hype,a.currentTime,0.5);
 chantTick(dt,active);
}

function buildPitch_fut(s,kits){
 const c=document.createElement('canvas');c.width=LW;c.height=LH;const g=c.getContext('2d');
 const L2=s.L/2,W2=s.W/2,G2=s.G/2,GD=SIM.GD,BAR=SIM.BAR;
 g.fillStyle='#0e1813';g.fillRect(0,0,LW,LH);
 // tribuna con hinchas (colores de los dos equipos)
 let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
 const crowdCols=[mix(kits[0].p,'#0e1813',0.35),mix(kits[0].s,'#0e1813',0.35),mix(kits[1].p,'#0e1813',0.35),mix(kits[1].s,'#0e1813',0.35),'#2b3a33','#1d2a24','#384a40','#1a2620'];
 const topEdge=P(0,-W2-0.5,1.1)[1],botEdge=P(0,W2+0.5,0)[1];
 const STD=game?game.stadium:stadiumOf(TEAMS[0]);
 const xInL=Math.floor(P(-L2-GD-0.6,0)[0])-3,xInR=Math.ceil(P(L2+GD+0.6,0)[0])+3;
 drawStadium(g,STD,kits,topEdge,botEdge,LW,LH,xInL,xInR);
 // césped con franjas de corte
 const[fx0,fy0]=P(-L2-0.6,-W2-0.4),[fx1,fy1]=P(L2+0.6,W2+0.4);
 g.fillStyle='#2f7d36';g.fillRect(Math.round(fx0),Math.round(fy0),Math.round(fx1-fx0),Math.round(fy1-fy0));
 const band=2.5;for(let x=-L2,i=0;x<L2;x+=band,i++){if(i%2)continue;const[a]=P(x),[b]=P(Math.min(L2,x+band));g.fillStyle='#358a3c';g.fillRect(Math.round(a),Math.round(P(0,-W2)[1]),Math.round(b-a),Math.round(P(0,W2)[1]-P(0,-W2)[1]));}
 // líneas
 const W='rgba(244,242,230,0.92)';
 const rect=(x0,y0,x1,y1)=>{const a=P(x0,y0),b=P(x1,y0),c2=P(x1,y1),d=P(x0,y1);pline(g,...a,...b,W);pline(g,...b,...c2,W);pline(g,...c2,...d,W);pline(g,...d,...a,W);};
 // esquinas redondeadas: lo que queda fuera del arco es valla, no cancha
 const RC=SIM.RC;
 for(const sx of [-1,1])for(const sy of [-1,1]){
  const ccx=sx*(L2-RC),ccy=sy*(W2-RC);
  const[a0,b0]=P(sx<0?-L2-0.6:L2-RC,sy<0?-W2-0.4:W2-RC),[a1,b1]=P(sx<0?-L2+RC:L2+0.6,sy<0?-W2+RC:W2+0.4);
  if(RC>0)for(let yy=Math.floor(b0);yy<=Math.ceil(b1);yy++)for(let xx=Math.floor(a0);xx<=Math.ceil(a1);xx++){
   const wx=(xx+0.5-view.cx)/view.ppm,wy=(yy+0.5-view.cy)/(view.ppm*YC);
   if(Math.abs(wx)>L2+0.01&&Math.abs(wy)<s.G/2)continue;
   if((wx-ccx)*sx>0&&(wy-ccy)*sy>0&&Math.hypot(wx-ccx,wy-ccy)>RC){g.fillStyle='#1c3524';g.fillRect(xx,yy,1,1);}
  }
 }
 pline(g,...P(-L2+RC,-W2),...P(L2-RC,-W2),W);pline(g,...P(-L2+RC,W2),...P(L2-RC,W2),W);
 for(const sx of [-1,1]){pline(g,...P(sx*L2,-W2+RC),...P(sx*L2,W2-RC),W);}
 for(const sx of [-1,1])for(const sy of [-1,1]){
  const ccx=sx*(L2-RC),ccy=sy*(W2-RC);let lp=null;
  if(RC>0)for(let i=0;i<=24;i++){const a=i/24*Math.PI/2,q=P(ccx+sx*Math.cos(a)*RC,ccy+sy*Math.sin(a)*RC);if(lp)pline(g,...lp,...q,W);lp=q;}
  // arco de córner
  lp=null;for(let i=0;i<=8;i++){const a=i/8*Math.PI/2,q=P(sx*(L2-Math.cos(a)*0.9),sy*(W2-Math.sin(a)*0.9));if(lp)pline(g,...lp,...q,W);lp=q;}
  // banderín
  const fp=P(sx*L2,sy*W2);g.fillStyle='#d9d9d2';g.fillRect(Math.round(fp[0]),Math.round(fp[1])-7,1,7);g.fillStyle=kits[0].p;g.fillRect(Math.round(fp[0])+(sx<0?1:-3),Math.round(fp[1])-7,3,2);g.fillStyle=sh(kits[0].p,-0.3);g.fillRect(Math.round(fp[0])+(sx<0?1:-3),Math.round(fp[1])-5,3,1);
 }
 pline(g,...P(0,-W2),...P(0,W2),W);
 pellipse(g,...P(0,0),3*view.ppm,3*view.ppm*YC,W);
 g.fillStyle=W;const cs=P(0,0);g.fillRect(Math.round(cs[0])-1,Math.round(cs[1]),2,1);
 for(const sd of [-1,1]){
  const bw=G2+2.6,bd=5;rect(sd<0?-L2:L2-bd,-bw,sd<0?-L2+bd:L2,bw);
  const aw=G2+0.9,ad=1.8;rect(sd<0?-L2:L2-ad,-aw,sd<0?-L2+ad:L2,aw);
  const ps=P(sd*(L2-3.6),0);g.fillRect(Math.round(ps[0]),Math.round(ps[1]),1,1);
 }
 // vallas publicitarias (son las paredes)
 const ads=['PICADITO','FERNET 1882','CHORI & PAN','MATE COCIDO','EL POTRERO','ASADO FC'];
 const adCols=[['#c8102e','#fff'],['#0b3d91','#ffd400'],['#1f1f1f','#7cfc00'],['#f2a900','#1a1a1a'],['#ffffff','#0b3d91'],['#5b2a86','#ffffff']];
 g.font='8px Silkscreen, monospace';g.textBaseline='middle';
 const boardH=0.9;
 const drawBoardRow=(y,front)=>{const[x0,yt]=P(-L2-GD-0.6,y,boardH),[x1,yb]=P(L2+GD+0.6,y,0);const w=x1-x0,h=Math.max(6,yb-yt);const n=6;
  for(let i=0;i<n;i++){const xa=Math.round(x0+w*i/n),xb=Math.round(x0+w*(i+1)/n);const[bgc,fg]=adCols[(i+(front?3:0))%adCols.length];g.fillStyle=bgc;g.fillRect(xa,Math.round(yt),xb-xa,Math.round(h));g.fillStyle='rgba(0,0,0,.35)';g.fillRect(xa,Math.round(yt+h)-1,xb-xa,1);g.fillStyle=fg;g.textAlign='center';g.fillText(ads[(i+(front?2:0))%ads.length],Math.round((xa+xb)/2),Math.round(yt+h/2)+1);}
 };
 drawBoardRow(-W2-0.25,false);
 // arcos: piso y redes (el marco va encima de los jugadores)
 for(const sd of [-1,1]){
  const xf=sd*L2,xb=sd*(L2+GD);
  const net='rgba(235,235,225,0.32)';
  g.fillStyle='rgba(0,0,0,0.18)';const q=[P(xf,-G2),P(xb,-G2),P(xb,G2),P(xf,G2)];g.beginPath();g.moveTo(...q[0]);for(const v of q)g.lineTo(...v);g.closePath();g.fill();
  void net;
  // sombra de los palos y del travesaño en el pasto
  g.fillStyle='rgba(0,0,0,0.22)';for(const y of [-G2,G2]){const a=P(xf,y,0);g.fillRect(Math.round(a[0])-1,Math.round(a[1]),4,2);}
 }
 return c;
}
/* ---------- arcos con red que se mueve ----------
   La red de atrás es una malla de puntos con resortes: cuando la pelota pega, se abolla y ondula.
   Las redes de los costados y el techo también ceden. Es solo visual: la física de la pelota está en SIM. */
const NET_NY=11,NET_NZ=7;
const nets={};
function netOf(sd){if(!nets[sd]){const n=NET_NY*NET_NZ;nets[sd]={d:new Float32Array(n),v:new Float32Array(n),side:[0,0],sideV:[0,0],roof:0,roofV:0};}return nets[sd];}
function resetNets_fut(){for(const k in nets)delete nets[k];}
function netHit_fut(e){
 const s=game.state,G2=s.G/2,BAR=SIM.BAR,N=netOf(e.sd);
 if(e.t==='net'){for(let i=0;i<NET_NY;i++)for(let j=0;j<NET_NZ;j++){const y=-G2+i*(2*G2)/(NET_NY-1),z=j*BAR/(NET_NZ-1),w=Math.exp(-(((y-e.y)**2)+((z-e.z)**2))/0.55);N.v[i*NET_NZ+j]+=w*Math.min(18,e.v)*0.16;}}
 else if(e.t==='sidenet'){const k=e.y>0?1:0;N.sideV[k]+=Math.min(14,e.v)*0.05+0.25;}
 else if(e.t==='roofnet'){N.roofV+=Math.min(10,e.v)*0.05+0.15;}
}
function updateNets_fut(dt,s){
 if(!(dt>0))return;const L2=s.L/2,G2=s.G/2,GD=SIM.GD,BAR=SIM.BAR,BR=SIM.BR,b=s.ball;
 const steps=Math.min(4,Math.ceil(dt/0.008)),h=dt/steps;
 for(const sd of [-1,1]){const N=netOf(sd);
  for(let st=0;st<steps;st++){
   for(let i=0;i<NET_NY;i++)for(let j=0;j<NET_NZ;j++){const k=i*NET_NZ+j;
    // los bordes están atados al marco
    if(i===0||i===NET_NY-1||j===NET_NZ-1){N.d[k]=0;N.v[k]=0;continue;}
    const nb=(N.d[k-NET_NZ]+N.d[k+NET_NZ]+N.d[k+1]+(j>0?N.d[k-1]:N.d[k]*0.5))*0.25;
    const a=-55*N.d[k]+260*(nb-N.d[k])-5*N.v[k];N.v[k]+=a*h;}
   for(let k=0;k<N.d.length;k++){N.d[k]+=N.v[k]*h;if(N.d[k]<-0.08)N.d[k]=-0.08;if(N.d[k]>0.75)N.d[k]=0.75;}
   for(const q of [0,1]){N.sideV[q]+=(-70*N.side[q]-4*N.sideV[q])*h;N.side[q]+=N.sideV[q]*h;}
   N.roofV+=(-70*N.roof-4*N.roofV)*h;N.roof+=N.roofV*h;
  }
  // la pelota apoyada contra la red la empuja
  const pen=b.x*sd-(L2+GD-BR);
  if(pen>-0.05&&Math.abs(b.y)<G2&&b.z<BAR){for(let i=1;i<NET_NY-1;i++)for(let j=0;j<NET_NZ-1;j++){const y=-G2+i*(2*G2)/(NET_NY-1),z=j*BAR/(NET_NZ-1),w=Math.exp(-(((y-b.y)**2)+((z-b.z)**2))/0.3),k=i*NET_NZ+j,t=(pen+0.12)*w;if(N.d[k]<t)N.d[k]=t;}}
 }
}
// partes de atrás del arco (van detrás de los jugadores): red del fondo, red lateral lejana y techo
function drawGoalBack_fut(c,s){
 const L2=s.L/2,G2=s.G/2,GD=SIM.GD,BAR=SIM.BAR;
 const netC='rgba(238,238,228,0.55)',netD='rgba(238,238,228,0.28)';
 for(const sd of [-1,1]){
  const N=netOf(sd),xf=sd*L2,xb=sd*(L2+GD);
  const node=(i,j)=>{const y=-G2+i*(2*G2)/(NET_NY-1),z=j*BAR/(NET_NZ-1);return P(xb+sd*N.d[i*NET_NZ+j],y,z);};
  // techo (de travesaño a la parte de arriba del fondo)
  for(let i=0;i<NET_NY;i+=2){const y=-G2+i*(2*G2)/(NET_NY-1);const a=P(xf,y,BAR),q=node(i,NET_NZ-1);const m=P((xf+xb)/2,y,BAR-0.12-N.roof*0.6);pline(c,...a,...m,netD);pline(c,...m,...q,netD);}
  for(let t=0.33;t<1;t+=0.33){const x=xf+(xb-xf)*t;pline(c,...P(x,-G2,BAR-N.roof*0.4),...P(x,G2,BAR-N.roof*0.4),netD);}
  // red lateral lejana (y = -G2)
  const sb=N.side[0];
  for(let t=0;t<=1.0001;t+=0.2){const x=xf+(xb-xf)*t,bul=Math.sin(t*Math.PI)*sb;pline(c,...P(x,-G2-bul,0),...P(x,-G2-bul,BAR),netD);}
  for(let z=0.4;z<BAR;z+=0.4)pline(c,...P(xf,-G2,z),...P(xb,-G2-0,z),netD);
  // red de atrás (malla con resortes)
  for(let i=0;i<NET_NY;i++)for(let j=0;j<NET_NZ;j++){
   const a=node(i,j);
   if(i<NET_NY-1){const q=node(i+1,j);pline(c,...a,...q,netC);}
   if(j<NET_NZ-1){const q=node(i,j+1);pline(c,...a,...q,netC);}
  }
  // caños de atrás (base y arriba)
  pline(c,...P(xb,-G2,0),...P(xb,G2,0),'#9aa0a8');pline(c,...P(xf,-G2,0),...P(xb,-G2,0),'#9aa0a8');
 }
}
function drawGoalFrames_fut(c,s){
 const L2=s.L/2,G2=s.G/2,GD=SIM.GD,BAR=SIM.BAR;
 for(const sd of [-1,1]){
  const N=netOf(sd),xf=sd*L2,xb=sd*(L2+GD),netC='rgba(238,238,228,0.42)';
  // red lateral cercana (y = +G2), por delante de la pelota
  const sb=N.side[1];
  for(let t=0;t<=1.0001;t+=0.2){const x=xf+(xb-xf)*t,bul=Math.sin(t*Math.PI)*sb;pline(c,...P(x,G2+bul,0),...P(x,G2+bul,BAR),netC);}
  for(let z=0.4;z<BAR;z+=0.4)pline(c,...P(xf,G2,z),...P(xb,G2,z),netC);
  pline(c,...P(xf,G2,BAR),...P(xb,G2,BAR),'#c9ccd1');pline(c,...P(xb,G2,0),...P(xb,G2,BAR),'#9aa0a8');pline(c,...P(xf,G2,0),...P(xb,G2,0),'#9aa0a8');
  pline(c,...P(xb,-G2,BAR),...P(xb,G2,BAR),'#c9ccd1');
  // palos y travesaño: tubos blancos con sombra
  for(const y of [-G2,G2]){const a=P(xf,y,0),q=P(xf,y,BAR);
   pline(c,a[0]-sd,a[1],q[0]-sd,q[1],'#ffffff');pline(c,...a,...q,'#ffffff');pline(c,a[0]+sd,a[1],q[0]+sd,q[1],'#b9bcc2');
   c.fillStyle='#8d949d';c.fillRect(Math.round(a[0])-1,Math.round(a[1]),3,1);}
  const a=P(xf,-G2,BAR),q=P(xf,G2,BAR);pline(c,...a,...q,'#ffffff');pline(c,a[0],a[1]-1,q[0],q[1]-1,'#ffffff');pline(c,a[0],a[1]+1,q[0],q[1]+1,'#b9bcc2');
 }
 // valla de adelante
 const L=s.L/2+GD+0.6,y=s.W/2+0.3;const[x0,yt]=P(-L,y,0.9),[x1,yb]=P(L,y,0);
 const cols=['#ffffff','#c8102e','#0b3d91','#f2a900','#1f1f1f','#5b2a86'];const n=6,w=x1-x0;
 for(let i=0;i<n;i++){const xa=Math.round(x0+w*i/n),xb=Math.round(x0+w*(i+1)/n);c.fillStyle=cols[i];c.fillRect(xa,Math.round(yb)-3,xb-xa,4);c.fillStyle='rgba(0,0,0,.4)';c.fillRect(xa,Math.round(yb)+1,xb-xa,1);}
}

function patColor(k,i,j){
 switch(k.pat){
  case'vstripes':return Math.floor(i/2)%2===0?k.p:k.s;
  case'hband':return j>=2&&j<=4?k.s:k.p;
  case'sash':{const d=(7-i)-j*1.15;return d>-1.6&&d<1.0?k.s:k.p;}
  case'hoops':return j%2?k.s:k.p;
  case'halves':return i<4?k.p:k.s;
  case'vee':return j<=3&&(i===j||i===7-j||i===j+1||i===6-j)?k.s:k.p;
  case'vband':return i===3||i===4?k.s:k.p;
  default:return k.p;
 }
}
function drawNum(c,num,col){
 const str=String(num);const x0=str.length===1?-2:-4;c.fillStyle=col;
 for(let d=0;d<str.length;d++){const rows=DIG[str[d]];for(let r=0;r<5;r++)for(let q=0;q<3;q++)if(rows[r][q]==='#')c.fillRect(x0+d*4+q,-15+r,1,1);}
}
// Peinado y detalles de cada jugador, fijos según su nombre
const HSTYLE={};
function hairStyle(name){const k=String(name||'');if(HSTYLE[k])return HSTYLE[k];let h=7;for(const ch of k)h=(Math.imul(h,31)+ch.charCodeAt(0))|0;h=Math.abs(h);
 return HSTYLE[k]={st:h%5,beard:(h>>3)%4===0,band:(h>>5)%9===0,acc:['#e8e8e8','#ff5a2a','#3fd8ff','#ffe14d','#7dff4f'][(h>>7)%5]};}
// Jugador chiquito (23 px de alto) con más detalle: sombreado, peinados, barba, orejas, nariz,
// cuello de la camiseta, escudito, medias con vivo, botines con color y carrera de 6 cuadros.
// Estirada del arquero: el cuerpo entero se estira hacia donde se tira (piernas atrás, brazos y guantes adelante).
// ph: 0 despegue · 1 en el aire · 2 en el piso. u: dirección en pantalla.
function drawDive(c,cx,cy,o,ux,uy,ph,lift){
 const k=o.kit,skin=o.skin,hair=o.hair,hs=hairStyle(o.name||o.num),glove='#f0f0ea';
 const nx=-uy,ny=ux,tilt=ph===0?0.55:ph===1?0.12:0;
 // en el despegue el cuerpo todavía está medio parado
 const ax=ux*(1-tilt),ay=uy*(1-tilt)-tilt,al=Math.hypot(ax,ay)||1,vx=ax/al,vy=ay/al,px2=-vy,py2=vx;
 const Pt=(a,b)=>[cx+vx*a+px2*b,cy+vy*a+py2*b-lift];
 const seg=(a0,b0,a1,b1,w,col)=>{const A=Pt(a0,b0),B=Pt(a1,b1),n=Math.max(1,Math.ceil(Math.hypot(B[0]-A[0],B[1]-A[1])));c.fillStyle=col;
  for(let i=0;i<=n;i++){const t=i/n;c.fillRect(Math.round(A[0]+(B[0]-A[0])*t-w/2),Math.round(A[1]+(B[1]-A[1])*t-w/2),w,w);}};
 const dot=(a,b,r,col)=>{const q=Pt(a,b);c.fillStyle=col;for(let y=-r;y<=r;y++)for(let x=-r;x<=r;x++)if(x*x+y*y<=r*r+r)c.fillRect(Math.round(q[0])+x,Math.round(q[1])+y,1,1);};
 // sombra en el pasto (se separa cuando está en el aire)
 c.fillStyle='rgba(0,0,0,0.28)';for(let a=-10;a<=13;a+=2){const q=[cx+ux*a,cy+uy*a*0.6];c.fillRect(Math.round(q[0])-2,Math.round(q[1])+1,4,2);}
 const spread=ph===0?1.6:ph===1?1.2:0.9,dk=-0.22;
 // piernas (la de atrás más oscura), medias y botines
 for(const s of [-1,1]){const d=s<0?dk:0;
  seg(-1,s*1,-6,s*spread,2,sh(k.shorts,d));seg(-6,s*spread,-10,s*(spread+0.3),2,sh(k.socks,d));seg(-10,s*(spread+0.3),-12,s*(spread+0.4),2,'#141414');}
 // short y torso con la camiseta
 seg(-2,0,1,0,4,k.shorts);
 seg(1,0,7,0,5,k.p);seg(2,-1.6,7,-1.6,1,sh(k.p,-0.2));seg(2,1.6,7,1.6,1,sh(k.p,0.12));
 if(k.s!==k.p)seg(3,0,5,0,2,k.s);
 // brazos estirados por delante de la cabeza, con los guantes
 const reach=ph===2?13:14.5;
 for(const s of [-1,1]){const d=s<0?dk:0;seg(6.5,s*2.2,reach-1.5,s*1.4,2,sh(k.sleeve,d));dot(reach,s*1.3,1,sh(glove,d*0.5));}
 // cabeza
 dot(9.8,0,2,hs.st===3?skin:hair);dot(10.3,0.3,1,skin);
 if(ph===2){c.fillStyle='rgba(190,235,170,0.55)';const q=Pt(-4,2.5);c.fillRect(Math.round(q[0]),Math.round(q[1])+2,2,1);const q2=Pt(9,-2.5);c.fillRect(Math.round(q2[0]),Math.round(q2[1])+2,1,1);}
}
function drawFootballer(c,fx,fy,o){
 c.save();c.translate(Math.round(fx),Math.round(fy));
 if(o.flip)c.scale(-1,1);
 if(o.diveDown){c.scale(1,-1);c.translate(0,-6);}
 const R=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h);};
 const k=o.kit,skin=o.skin,hair=o.hair,boot='#141414',eye='#1b1b1b';
 const hs=hairStyle(o.name||o.num),skD=sh(skin,-0.22),skL=sh(skin,0.12),hairL=sh(hair,0.18);
 const glove='#f0f0ea';
 // carrera: 8 cuadros, con el pie que vuelve levantado, el cuerpo que baja en la zancada y los brazos al revés de las piernas
 const f8=o.moving?Math.floor((o.phase||0)*2)%8:0,a=f8/8*Math.PI*2;
 const sprint=!!o.lean&&o.moving;
 const amp=sprint?2.9:2.4;
 const swing=o.moving?Math.round(Math.sin(a)*amp):0,lift=o.moving?Math.cos(a):0;
 let bob=o.moving&&Math.abs(Math.sin(a))>0.75?1:0;
 if(o.ready)bob=o.moving?(f8%3===0?1:2):2; // arquero atento: agachado
 if(o.stance)bob=Math.max(bob,1);          // defensa: piernas flexionadas
 if(o.knee)bob=4;                           // festejo de rodillas
 const kw=o.kickW||0,kt=o.kickT==null?-1:o.kickT; // carga del tiro (0..1) y avance de la patada (0..1)
 const heldBall=(x,y)=>{R(x,y+1,5,3,'#f4f4ee');R(x+1,y,3,5,'#f4f4ee');R(x+1,y+1,1,1,'#555');R(x+3,y+3,1,1,'#555');R(x+3,y+1,1,1,'#9a9a9a');R(x+1,y+4,3,1,'#c9c9c0');};
 if(o.view==='side'){
  let fl=swing,bl=-swing,up=o.moving&&lift<-0.35?(sprint&&lift<-0.8?2:1):0,up2=o.moving&&lift>0.35?(sprint&&lift>0.8?2:1):0;
  // inclinación del torso: hacia adelante al picar, para atrás al armar la patada
  let tx=sprint?1:0;
  if(o.ready&&!o.kick){fl=o.moving?(f8%2?2:1):2;bl=o.moving?(f8%2?-1:-2):-2;up=0;up2=0;}
  if(o.stance&&!o.moving){fl=2;bl=-2;}
  if(kw>0&&!o.kick){fl=-2-Math.round(kw*1.6);up=1+Math.round(kw*1.5);bl=1;up2=0;tx=-1;} // pierna atrás, cargando
  if(o.kick){
   if(kt<0||kt<0.45){fl=3;up=1;bl=-1;up2=0;tx=0;}       // impacto
   else{fl=3;up=3+Math.round((kt-0.45)*3);bl=0;up2=0;tx=-1;} // la pierna sigue de largo, hacia arriba
  }
  if(o.heel){bl=-3;up2=3;}
  if(o.hang){fl=1;bl=-1;up=3;up2=2;}
  if(o.knee){fl=2;bl=-2;up=0;up2=0;}
  // pierna de atrás (más oscura)
  const leg=(dx,du,dark)=>{const d=dark?-0.28:0;
   R(-1+dx,-5-du,2,3,sh(k.socks,d));if(k.s!==k.socks)R(-1+dx,-5-du,2,1,sh(k.s===k.p?'#f4f4f2':k.s,d-0.05));
   R(-1+dx,-6-du,2,1,dark?skD:skin);
   R(-1+dx,-2-du,3,2,boot);R(1+dx,-1-du,1,1,dark?sh(hs.acc,-0.4):hs.acc);R(-1+dx,-2-du,1,1,'#2a2a2a');};
  if(!o.knee)leg(bl,up2,true);
  // short
  R(-3,-9+bob,6,3,k.shorts);R(-3,-7+bob,6,1,sh(k.shorts,-0.25));R(-3,-9+bob,1,2,sh(k.shorts,-0.15));
  if(o.knee){R(-2,-6+bob,5,2,sh(k.socks,-0.1));R(3,-5+bob,2,2,boot);}else leg(fl,up,false);
  // camiseta: la espalda en sombra, el pecho iluminado (se corre con la inclinación)
  for(let j=0;j<7;j++){const sx=j<3?tx:j<5&&tx?Math.sign(tx):0;for(let i=0;i<6;i++){let col=patColor(k,i+1,j);if(i===0)col=sh(col,-0.25);else if(i===5)col=sh(col,0.1);R(-3+i+sx,-16+j+bob,1,1,col);}}
  R(-3+tx,-16+bob,6,1,sh(patColor(k,3,0),0.08));if(k.collar)R(1+tx,-16+bob,2,1,k.collar);
  // brazos
  const ao=o.moving?Math.round(Math.sin(a+Math.PI)*(sprint?1.8:1.2)):0,hf=o.moving?1:0;
  const ax=tx;
  if(o.hold){R(-1,-15+bob,2,2,k.sleeve);R(1,-14+bob,2,2,k.sleeve);heldBall(1,-15+bob);R(3,-13+bob,2,2,glove);R(1,-11+bob,2,2,glove);}
  else if(o.thr!=null){if(o.thr<0.5){R(-2,-19+bob,2,4,k.sleeve);R(-3,-23+bob,2,4,k.sleeve);R(-3,-25+bob,2,2,glove);if(o.thr<0.3)heldBall(-4,-28+bob);}
   else{R(0,-16+bob,3,2,k.sleeve);R(3,-17+bob,2,2,k.sleeve);R(5,-18+bob,2,2,glove);}}
  else if(o.ready){R(0,-15+bob,3,2,k.sleeve);R(3,-14+bob,2,2,k.sleeve);R(4,-12+bob,2,2,glove);R(-3,-14+bob,2,2,sh(k.sleeve,-0.25));R(-4,-12+bob,2,2,sh(glove,-0.15));}
  else if(o.armsUp||o.hang){ // brazo de atrás arriba (el de adelante se dibuja después de la cabeza)
   R(-1+ax,-19+bob,2,3,sh(k.sleeve,-0.2));R(-1+ax,-28+bob,2,9,skD);}
  else if(o.oneUp){R(-2+ax,-15+bob,2,3,sh(k.sleeve,-0.2));R(-3+ax,-12+bob,2,2,skD);}
  else if(o.reach){ // manotazo: el brazo de adelante bien estirado hacia la pelota
   R(1+ax,-15+bob,3,2,k.sleeve);R(4+ax,-15+bob,3,1,skin);R(4+ax,-14+bob,2,1,skD);R(7+ax,-15+bob,1,2,skin);
   R(-3+ax,-15+bob,2,3,sh(k.sleeve,-0.25));R(-4+ax,-12+bob,2,2,skD);}
  else if(o.chest){ // pase de pecho: los dos brazos empujando adelante
   R(1+ax,-15+bob,3,2,k.sleeve);R(4+ax,-15+bob,2,2,skin);R(1+ax,-13+bob,3,1,sh(k.sleeve,-0.25));R(4+ax,-13+bob,2,1,skD);}
  else if(o.dribble){ // pica la pelota: la mano de adelante baja y sube con el pique
   const dz=o.dribZ==null?0.5:o.dribZ,hy0=dz<0.35?-9:dz<0.7?-11:-12;
   R(1+ax,-15+bob,2,3,k.sleeve);R(2+ax,hy0+bob,2,2,skin);R(3+ax,hy0+1+bob,1,1,skD);
   R(-2+ax,-15+bob,2,3,sh(k.sleeve,-0.25));R(-3+ax,-12+bob,2,2,skD);}
  else if(o.armsOut||kw>0||o.kick){ // equilibrio al patear o al cabecear
   const up3=o.kick&&kt>0.45?1:0;R(1+ax,-15+bob-up3,3,2,k.sleeve);R(4+ax,-15+bob-up3,2,2,o.gk?glove:skin);R(-4+ax,-15+bob,2,2,sh(k.sleeve,-0.25));R(-6+ax,-15+bob+up3,2,2,o.gk?glove:skD);}
  else if(o.stance){R(1,-15+bob,3,2,k.sleeve);R(4,-14+bob,2,2,skin);R(-3,-14+bob,2,2,sh(k.sleeve,-0.25));R(-5,-13+bob,2,2,skD);}
  else{R(-1+ao+ax,-15+bob,2,3,k.sleeve);R(-1+ao+ax,-15+bob,1,3,sh(k.sleeve,-0.2));
   const hx=-1+ao+ax+(ao>0?hf:0)+(sprint&&ao>0?1:0);
   if(o.gk){R(hx,-12+bob,2,2,k.sleeve);R(hx,-10+bob,2,2,glove);}
   else{R(hx,-12+bob-(sprint&&ao>0?1:0),2,2,skin);R(hx,-12+bob-(sprint&&ao>0?1:0),1,2,skD);}}
  // cabeza de perfil: nuca en sombra, oreja, ojo, nariz (va con la inclinación)
  const hy=bob,hx2=tx;
  R(0+hx2,-17+hy,2,1,skD);
  R(-2+hx2,-23+hy,5,6,skin);R(-2+hx2,-23+hy,1,6,skD);R(3+hx2,-20+hy,1,1,skin);R(2+hx2,-22+hy,1,1,skL);
  R(2+hx2,-20+hy,1,1,eye);R(0+hx2,-20+hy,1,1,sh(skin,-0.35));
  if(o.cele)R(2+hx2,-18+hy,1,1,'#3a1414'); // grito
  if(hs.beard&&hs.st!==3){R(0+hx2,-18+hy,3,1,hair);R(2+hx2,-19+hy,1,1,hair);}
  if(hs.st===3){R(-2+hx2,-23+hy,5,1,skL);R(-2+hx2,-22+hy,1,2,hair);}
  else if(hs.st===2){R(-2+hx2,-23+hy,5,1,sh(hair,-0.1));R(-2+hx2,-22+hy,2,1,hair);}
  else{R(-2+hx2,-23+hy,5,2,hair);R(-2+hx2,-21+hy,2,2,hair);R(-1+hx2,-23+hy,3,1,hairL);
   if(hs.st===1){const fl2=o.moving&&f8%4<2?1:0;R(-3+hx2-fl2,-22+hy,1,5,hair);R(-2+hx2,-19+hy,1,2,hair);} // pelo largo: se mueve al correr
   if(hs.st===4){R(-3+hx2,-24+hy,6,2,hair);R(-3+hx2,-22+hy,1,2,hair);R(-2+hx2,-24+hy,3,1,hairL);}}
  if(hs.band&&hs.st!==3)R(-2+hx2,-21+hy,5,1,k.s===k.p?'#f4f4f2':k.s);
  // brazo de adelante levantado: va por delante de la cara
  if((o.armsUp||o.hang||o.oneUp)&&!o.hold&&o.thr==null&&!o.ready){
   R(1+ax,-17+bob,2,2,k.sleeve);R(3+ax,-19+bob,2,2,k.sleeve);R(3+ax,-27+bob,2,8,skin);R(4+ax,-28+bob,1,1,skL);
   if(o.hang)R(0+ax,-29+bob,6,1,'#ff6a1f');}
 }else{
  const front=o.view!=='back';
  let lo=o.moving?(lift<-0.35?-1:0):0,ro=o.moving?(lift>0.35?-1:0):0,lx=0,rx=0;
  if(sprint){lo*=2;ro*=2;}
  // bicicleta: una pierna pasa por encima de la pelota, levantada y hacia afuera
  if(o.legOut<0){lo=-3;lx=-2;}else if(o.legOut>0){ro=-3;rx=2;}
  if(kw>0&&!o.kick){ro=-1-Math.round(kw*1.5);rx=1;}      // armando la patada
  if(o.kick){ro=kt>0.45?-4:-3;rx=kt>0.45?1:0;}            // patada y seguimiento
  if(o.stance&&!o.moving){lx=-1;rx=1;}
  if(o.hang){lo=-2;ro=-2;}
  const legF=(x,dy,dark)=>{const d=dark?-0.18:0;
   R(x,-2+dy,2,2,boot);R(x+(x<0?0:1),-1+dy,1,1,hs.acc);
   R(x,-5+dy,2,3,sh(k.socks,d));if(k.s!==k.socks)R(x,-5+dy,2,1,sh(k.s===k.p?'#f4f4f2':k.s,d-0.05));
   R(x,-6+dy,2,1,dark?skD:skin);};
  if(o.ready){lx=o.moving&&f8%2?0:-1;rx=o.moving&&f8%2?0:1;lo=0;ro=0;}
  if(o.knee){R(-4,-3,3,2,sh(k.socks,-0.1));R(1,-3,3,2,sh(k.socks,-0.2));}
  else{legF(-3+lx,lo,false);legF(1+rx,ro,true);}
  // short con la abertura entre las piernas
  R(-4,-9+bob,8,3,k.shorts);R(-4,-7+bob,8,1,sh(k.shorts,-0.25));R(2,-9+bob,2,2,sh(k.shorts,-0.12));R(-1,-7+bob,2,1,sh(k.shorts,-0.45));
  // camiseta con luz de la izquierda
  for(let j=0;j<7;j++)for(let i=0;i<8;i++){let col=patColor(k,i,j);if(i>=6)col=sh(col,-0.2);else if(i===0)col=sh(col,0.1);if(j===6)col=sh(col,-0.12);R(-4+i,-16+j+bob,1,1,col);}
  if(front){if(k.collar){R(-1,-16+bob,2,1,k.collar);R(-1,-15+bob,1,1,sh(k.collar,-0.2));}
   R(1,-14+bob,1,1,lum(k.p)>150?'#3a3a3a':'#ffd23a');} // escudito
  else{R(-2,-16+bob,4,1,sh(patColor(k,3,0),-0.15));}
  const armL=(y0,len,dark)=>{R(-6,y0,2,3,dark?sh(k.sleeve,-0.2):k.sleeve);R(-6,y0+3,2,len,o.gk?k.sleeve:dark?skD:skin);},armR=(y0,len)=>{R(4,y0,2,3,sh(k.sleeve,-0.2));R(4,y0+3,2,len,o.gk?sh(k.sleeve,-0.2):skD);};
  if(o.hold){R(-6,-16+bob,2,3,k.sleeve);R(-5,-13+bob,2,2,k.sleeve);R(4,-16+bob,2,3,sh(k.sleeve,-0.2));R(3,-13+bob,2,2,sh(k.sleeve,-0.2));
   if(front){heldBall(-3,-14+bob);R(-4,-12+bob,2,2,glove);R(2,-12+bob,2,2,glove);}}
  else if(o.thr!=null){if(o.thr<0.5){R(3,-21+bob,2,5,k.sleeve);R(3,-24+bob,2,3,k.sleeve);R(3,-26+bob,2,2,glove);if(o.thr<0.3)heldBall(2,-29+bob);}
    else{R(3,-16+bob,2,3,k.sleeve);R(3,-13+bob,2,2,glove);}
   R(-6,-16+bob,2,3,k.sleeve);R(-7,-13+bob,2,2,glove);}
  else if(o.ready){R(-6,-16+bob,2,2,k.sleeve);R(-7,-14+bob,2,2,k.sleeve);R(-9,-13+bob,2,2,glove);R(4,-16+bob,2,2,sh(k.sleeve,-0.2));R(5,-14+bob,2,2,sh(k.sleeve,-0.2));R(7,-13+bob,2,2,glove);}
  else if(o.armsUp||o.hang){R(-5,-23+bob,2,3,k.sleeve);R(-5,-27+bob,2,4,o.gk?k.sleeve:skin);R(3,-23+bob,2,3,sh(k.sleeve,-0.18));R(3,-27+bob,2,4,o.gk?sh(k.sleeve,-0.18):skD);if(o.gk){R(-5,-29+bob,2,2,glove);R(3,-29+bob,2,2,glove);}
   if(o.hang)R(-5,-28+bob,10,1,'#ff6a1f');}
  else if(o.oneUp){R(3,-23+bob,2,3,sh(k.sleeve,-0.18));R(3,-27+bob,2,4,skD);armL(-16+bob,3,false);}
  else if(o.reach){R(-8,-16+bob,4,2,k.sleeve);R(-11,-16+bob,3,2,skin);armR(-16+bob,3);}
  else if(o.chest){R(-4,-14+bob,2,2,k.sleeve);R(2,-14+bob,2,2,sh(k.sleeve,-0.2));R(-2,-13+bob,4,2,skin);}
  else if(o.dribble){const dz=o.dribZ==null?0.5:o.dribZ,ext=dz<0.35?4:dz<0.7?3:2;armL(-16+bob,3,false);R(4,-16+bob,2,3,sh(k.sleeve,-0.2));R(4,-13+bob,2,ext,skD);}
  else if(o.armsOut||kw>0||o.kick){R(-7,-16+bob,3,2,k.sleeve);R(-9,-16+bob,2,2,o.gk?glove:skin);R(4,-16+bob,3,2,sh(k.sleeve,-0.18));R(7,-16+bob,2,2,o.gk?glove:skD);}
  else if(o.stance){R(-7,-15+bob,3,2,k.sleeve);R(-9,-14+bob,2,2,skin);R(4,-15+bob,3,2,sh(k.sleeve,-0.18));R(7,-14+bob,2,2,skD);}
  else{const as=o.moving?Math.round(Math.sin(a)*(sprint?1.8:1.3)):0;
   R(-6,-16+as+bob,2,3,k.sleeve);R(-6,-16+as+bob,1,3,sh(k.sleeve,0.08));R(-6,-13+as+bob,2,3,o.gk?k.sleeve:skin);
   R(4,-16-as+bob,2,3,sh(k.sleeve,-0.2));R(4,-13-as+bob,2,3,o.gk?sh(k.sleeve,-0.2):skD);
   if(o.gk){R(-6,-11+as+bob,2,2,glove);R(4,-11-as+bob,2,2,glove);}}
  // cabeza
  const hy=bob;
  R(-1,-17+hy,2,1,skD);
  R(-3,-23+hy,6,6,skin);R(2,-23+hy,1,6,skD);R(-4,-20+hy,1,2,skin);R(3,-20+hy,1,2,skD); // orejas
  if(o.view==='back'){
   if(hs.st===3){R(-3,-23+hy,6,2,skL);R(-3,-21+hy,6,1,hair);}
   else if(hs.st===2)R(-3,-23+hy,6,3,sh(hair,-0.1));
   else{R(-3,-23+hy,6,5,hair);R(-2,-23+hy,3,1,hairL);if(hs.st===1)R(-3,-18+hy,6,2,hair);if(hs.st===4){R(-4,-25+hy,8,4,hair);R(-3,-25+hy,4,1,hairL);}}
   if(hs.band&&hs.st!==3)R(-3,-21+hy,6,1,k.s===k.p?'#f4f4f2':k.s);
   if(o.num!=null)drawNum(c,o.num,k.num);
  }else{
   R(-2,-22+hy,2,1,skL);
   R(-2,-20+hy,1,1,eye);R(1,-20+hy,1,1,eye);R(0,-19+hy,1,1,sh(skin,-0.3)); // ojos y nariz
   if(o.cele){R(-1,-18+hy,2,2,'#3a1414');} // boca abierta: grito de gol
   else if(hs.beard&&hs.st!==3){R(-3,-18+hy,6,1,hair);R(-3,-19+hy,1,1,hair);R(2,-19+hy,1,1,hair);R(-1,-18+hy,2,1,sh(hair,0.2));}
   else R(-1,-18+hy,2,1,sh(skin,-0.28)); // boca
   if(hs.st===3){R(-3,-23+hy,6,1,skL);}
   else if(hs.st===2){R(-3,-23+hy,6,1,sh(hair,-0.1));R(-3,-22+hy,1,1,hair);R(2,-22+hy,1,1,hair);}
   else{R(-3,-23+hy,6,2,hair);R(-3,-21+hy,1,1,hair);R(2,-21+hy,1,1,hair);R(-2,-23+hy,3,1,hairL);
    if(hs.st===1){R(-4,-22+hy,1,5,hair);R(3,-22+hy,1,5,hair);}
    if(hs.st===4){R(-4,-25+hy,8,3,hair);R(-4,-22+hy,1,2,hair);R(3,-22+hy,1,2,hair);R(-3,-25+hy,4,1,hairL);}}
   if(hs.band&&hs.st!==3)R(-3,-21+hy,6,1,k.s===k.p?'#f4f4f2':k.s);
  }
 }
 c.restore();
}
const BALL5=['.###.','#####','#####','#####','.###.'];
const BALL7=['..###..','.#####.','#######','#######','#######','.#####.','..###..'];
function drawBall_fut(c,b){
 const[gx,gy]=P(b.x,b.y,0);const a=Math.max(0.15,0.45-b.z*0.08);
 c.fillStyle=`rgba(0,0,0,${a})`;c.fillRect(Math.round(gx)-2,Math.round(gy),5,2);c.fillRect(Math.round(gx)-1,Math.round(gy)-1,3,1);
 const[x,y]=P(b.x,b.y,b.z);const pat=b.z>1.1?BALL7:BALL5,h=pat.length;
 const ox=Math.round(x)-(h>>1),oy=Math.round(y)-h+1;
 const fr=Math.floor(b.roll*3)%4;const spots=h===5?[[1,1],[3,1],[3,3],[1,3]]:[[2,2],[4,2],[4,4],[2,4]];const sp=spots[fr];
 for(let r=0;r<h;r++)for(let q=0;q<h;q++){if(pat[r][q]!=='#')continue;let col=r===h-1||q===h-1?'#cfcfc8':'#fbfbf6';if(q===sp[0]&&r===sp[1])col='#1b1b1b';c.fillStyle=col;c.fillRect(ox+q,oy+r,1,1);}
}

/* ---------- efectos (solo visuales, no tocan la simulación) ---------- */
const fx={shake:0,trail:[],popups:[],confetti:[],flash:0,dust:[]};
function resetFX(){fx.shake=0;fx.trail.length=0;fx.popups.length=0;fx.confetti.length=0;fx.flash=0;}
function popup(text,x,y,col){fx.popups.push({text,x,y,col:col||'#ffb02e',t:0});if(fx.popups.length>6)fx.popups.shift();}
function spawnConfetti(kit){
 const top=P(0,-game.state.W/2-0.5,1.1)[1];
 for(let i=0;i<160;i++){const bottom=i%3===0;fx.confetti.push({x:Math.random()*LW,y:bottom?LH-Math.random()*26:Math.random()*Math.max(10,top-6),vx:(Math.random()-0.5)*24,vy:-(14+Math.random()*30),col:Math.random()<0.5?kit.p:kit.s,t:0,ttl:2+Math.random()*1.6});}
}
function snap_fut(s){return{b:{x:s.ball.x,y:s.ball.y,z:s.ball.z,roll:s.ball.roll,vx:s.ball.vx,vy:s.ball.vy},p:s.players.map(p=>[p.x,p.y,p.face,p.run,p.vx,p.vy,p.dive?p.dive.dy:null,p.diveT,p.kickAnim,p.slideT,p.slideDx,p.stunT,p.skill?{type:p.skill.type,t:p.skill.t,dur:p.skill.dur,burst:p.skill.burst}:null])};}
function snapScene_fut(f){
 const s=game.state;
 const players=s.players.map((p,i)=>{const a=f.p[i],o=Object.create(p);o.x=a[0];o.y=a[1];o.face=a[2];o.run=a[3];o.vx=a[4];o.vy=a[5];o.dive=a[6]==null?null:{dy:a[6]};o.diveT=a[7];o.kickAnim=a[8];o.slideT=a[9];o.slideDx=a[10];o.stunT=a[11];o.skill=a[12]||null;o.charging=false;return o;});
 return{players,ball:f.b,replay:true};
}
function viewOf(p){
 const cs=Math.cos(p.face),sn=Math.sin(p.face);
 if(Math.abs(cs)>0.62)return{view:'side',flip:cs<0};
 return{view:sn>0?'front':'back',flip:false};
}
function drawAim_fut(c,s,p){
 const inp=game.lastInputs&&game.lastInputs[p.id];if(!inp)return;
 const k=SIM.previewKick(s,p,inp),b=s.ball;
 if(!k.reach){
  for(let i=1;i<=3;i++){const q=P(p.x+k.ax*(0.6+i*0.5),p.y+k.ay*(0.6+i*0.5));c.fillStyle='rgba(255,255,255,0.35)';c.fillRect(Math.round(q[0]),Math.round(q[1]),1,1);}
  return;
 }
 const col=k.weak?'#ff5a4f':k.perfect?'#7dff4f':p.charge>0.86?'#ff9b4f':'#ffffff';
 const n=k.weak?4:12;
 for(let i=1;i<=n;i++){
  const t=i*0.055;let z=b.z+k.vz*t-7*t*t;if(z<0)z=0;
  const q=P(b.x+k.ux*k.spd*t,b.y+k.uy*k.spd*t,z);
  if(Math.abs(b.x+k.ux*k.spd*t)>s.L/2+SIM.GD||Math.abs(b.y+k.uy*k.spd*t)>s.W/2)break;
  c.fillStyle=col;c.globalAlpha=1-i/(n+2);c.fillRect(Math.round(q[0]),Math.round(q[1]),2,1);
 }
 c.globalAlpha=1;
}
// anillo pixelado (elipse de puntos), opcionalmente solo un arco desde arriba en sentido horario
function ringPx(c,cx,cy,rx,ry,col,dotted,from,to){
 const n=Math.max(28,Math.round((rx+ry)*4));c.fillStyle=col;from=from||0;to=to==null?1:to;
 let lx=null,ly=null,k=0;
 for(let i=Math.floor(from*n);i<=Math.ceil(to*n);i++){const a=-Math.PI/2+i/n*Math.PI*2,x=Math.round(cx+Math.cos(a)*rx),y=Math.round(cy+Math.sin(a)*ry);if(x===lx&&y===ly)continue;lx=x;ly=y;k++;if(dotted&&k%2)continue;c.fillRect(x,y,1,1);}
}
// medidor de potencia circular alrededor de los pies: amarillo, zona verde = perfecto, rojo = se eleva
function drawChargeRing_fut(c,sx,sy,p,rx,ry){
 rx+=4;ry+=3;
 for(const d of [-1,0,1,2])ringPx(c,sx,sy+d,rx+(d<0?1:0),ry,'rgba(0,0,0,0.6)',false);
 ringPx(c,sx,sy,rx,ry,'rgba(125,255,79,0.35)',false,0.76,0.86);
 const ch=Math.min(1,p.charge);
 ringPx(c,sx,sy,rx,ry,'#e8e24a',false,0,Math.min(ch,0.76));
 if(ch>0.76)ringPx(c,sx,sy,rx,ry,'#7dff4f',false,0.76,Math.min(ch,0.86));
 if(ch>0.86)ringPx(c,sx,sy,rx,ry,p.charge>1&&Math.floor(performance.now()/90)%2?'#ffffff':'#ff3b30',false,0.86,ch);
 // segunda línea para que se lea gruesa
 ringPx(c,sx,sy+1,rx,ry,'#e8e24a',false,0,Math.min(ch,0.76));
 if(ch>0.76)ringPx(c,sx,sy+1,rx,ry,'#7dff4f',false,0.76,Math.min(ch,0.86));
 if(ch>0.86)ringPx(c,sx,sy+1,rx,ry,'#ff3b30',false,0.86,ch);
}
// dónde cae la pelota cuando va por arriba
function drawLanding_fut(c,b){
 if(b.z<0.35&&!((b.vz||0)>1.5))return;
 const vz=b.vz||0,t=(vz+Math.sqrt(vz*vz+28*Math.max(0,b.z)))/14;if(!(t>0.08))return;
 const k=Math.exp(-0.15*t),lx=b.x+(b.vx||0)*t*k,ly=b.y+(b.vy||0)*t*k;
 const[x,y]=P(lx,ly,0);const r=Math.max(4,Math.round(view.ppm*0.55)),ry=Math.max(2,Math.round(r*YC));
 const pul=Math.sin(performance.now()/120)*0.5+0.5;
 for(let yy=-ry;yy<=ry;yy++){const w=Math.round(r*Math.sqrt(1-(yy*yy)/(ry*ry)));c.fillStyle=`rgba(90,230,130,${0.18+0.1*pul})`;c.fillRect(Math.round(x)-w,Math.round(y)+yy,w*2+1,1);}
 ringPx(c,x,y,r,ry,'rgba(140,255,170,0.7)',true);
}
function drawChargeBar(c,sx,sy,p){
 const bw=18,x0=Math.round(sx)-9,y0=Math.round(sy)+3;
 const seg=(a,b2,col)=>{c.fillStyle=col;c.fillRect(x0+Math.round(a*bw),y0,Math.max(1,Math.round((b2-a)*bw)),2);};
 c.fillStyle='#000';c.fillRect(x0-1,y0-1,bw+2,4);
 seg(0,0.76,'#3a3a32');seg(0.76,0.86,'#1f5a2a');seg(0.86,1,'#5a1f1f');
 const ch=Math.min(1,p.charge);
 seg(0,Math.min(ch,0.76),'#e8e24a');if(ch>0.76)seg(0.76,Math.min(ch,0.86),'#7dff4f');if(ch>0.86)seg(0.86,ch,'#ff3b30');
}
const scrSize={w:0,h:0};
try{new ResizeObserver(()=>{scrSize.w=screen.clientWidth;scrSize.h=screen.clientHeight;}).observe(screen);}catch(e){addEventListener('resize',()=>{scrSize.w=0;});}
function render(dt){
 if(!scrSize.w){scrSize.w=screen.clientWidth;scrSize.h=screen.clientHeight;}
 const dpr=Math.min(1.5,window.devicePixelRatio||1);
 const W=Math.round(scrSize.w*dpr),H=Math.round(scrSize.h*dpr);
 if(screen.width!==W||screen.height!==H){screen.width=W;screen.height=H;}
 sctx.fillStyle='#0b1712';sctx.fillRect(0,0,W,H);
 if(!game)return;
 if(game.pens){renderPens(dt,W,H);return;}
 if(!game.demo&&!game.replay&&setup.cam2k){k2Update(dt);if(game.k2&&game.k2.ok){render2k(dt,W,H);return;}}
 const s=game.state;
 const scn=game.replay?snapScene(game.replay.frames[Math.min(game.replay.frames.length-1,Math.floor(game.replay.t))]):{players:s.players,ball:s.ball,replay:false};
 const key=s.L+'|'+game.kits[0].p+game.kits[1].p+'|'+fontsReady+'|'+game.stadium.n+game.teams[0].id+game.teams[1].id;
 if(key!==pitchKey){view=makeView(s);pitch=buildPitch(s,game.kits);pitchKey=key;
  const W2=s.W/2,tE=P(0,-W2-0.5,1.1)[1],bE=P(0,W2+0.5,0)[1];crowd=buildCrowd(game.stadium,game.kits,tE,bE,LW,LH);
  // trapos colgados: van arriba de la gente
  crowd.T=document.createElement('canvas');crowd.T.width=LW;crowd.T.height=LH;drawTrapos(crowd.T.getContext('2d'),game.stadium,game.teams,game.kits,tE,bE,LW);}
 if(!crowd)bx.drawImage(pitch,0,0); // con hinchada, la cancha ya va en la capa de las tribunas
 updateParty(game.paused?0:dt);drawStands(bx,performance.now()/1000);
 // papelitos en la tribuna
 for(let i=fx.confetti.length-1;i>=0;i--){const q=fx.confetti[i];q.t+=dt;if(q.paper){q.vy=Math.min(q.vy+14*dt,9);q.vx*=Math.exp(-1.5*dt);q.x+=q.vx*dt+Math.sin(q.t*5+i)*0.25;}else{q.vy+=34*dt;q.x+=q.vx*dt+Math.sin(q.t*9+i)*0.3;}q.y+=q.vy*dt;if(q.t>q.ttl){fx.confetti.splice(i,1);continue;}bx.fillStyle=q.col;bx.fillRect(Math.round(q.x),Math.round(q.y),(q.paper&&Math.floor(q.t*6+i)%2)?1:2,1);}
 const b=scn.ball,bsp=Math.hypot(b.vx||0,b.vy||0);
 if(bsp>13)fx.trail.push(P(b.x,b.y,b.z));else if(fx.trail.length)fx.trail.shift();
 while(fx.trail.length>7)fx.trail.shift();
 // mira de tiro del jugador humano
 if(!scn.replay&&!game.demo)for(const p of s.players)if(p.charging&&game.ctrls[p.id].type==='human')drawAim(bx,s,p);
 updateNets(game.paused||scn.replay?0:dt,s);drawGoalBack(bx,s);
 drawLanding(bx,b);
 for(let i=fx.dust.length-1;i>=0;i--){const q=fx.dust[i];q.t+=dt;if(q.t>0.3){fx.dust.splice(i,1);continue;}const[x,y]=P(q.x+q.vx*q.t,q.y+q.vy*q.t,q.t*1.2);bx.fillStyle=`rgba(${SPORT.dust||'190,235,170'},${0.8*(1-q.t/0.3)})`;bx.fillRect(Math.round(x),Math.round(y),1,1);}
 const ents=scn.players.map(p=>({y:p.y,p}));ents.push({y:b.y-0.01,ball:true},{y:0.04,hoop:-1},{y:0.04,hoop:1});
 ents.sort((a,c)=>a.y-c.y);
 const now=performance.now()/1000;
 for(const e of ents){
  if(e.hoop){drawHoop(bx,s,e.hoop);continue;}
  if(e.ball){
   fx.trail.forEach((q,i)=>{bx.fillStyle=`rgba(255,240,200,${(i+1)/(fx.trail.length+1)*0.55})`;bx.fillRect(Math.round(q[0])-1,Math.round(q[1])-2,2,2);});
   drawBall(bx,b);continue;
  }
  const p=e.p,[sx,sy]=P(p.x,p.y,0);
  const human=!game.demo&&game.ctrls[p.id].type==='human';
  const hcol=human?(game.ctrls[p.id].col||(game.ctrls[p.id].slot===1?'#3fd8ff':'#ff5aa8')):null;
  bx.fillStyle='rgba(0,0,0,0.32)';bx.fillRect(Math.round(sx)-4,Math.round(sy)-1,9,2);
  if(!scn.replay&&!game.paused&&p.spr&&Math.hypot(p.vx,p.vy)>5&&Math.random()<0.2){fx.dust.push({x:p.x-p.vx*0.03,y:p.y-p.vy*0.03,vx:-p.vx*0.1+(Math.random()-0.5),vy:-p.vy*0.1+(Math.random()-0.5),t:0});if(fx.dust.length>40)fx.dust.shift();}
  if(human&&!scn.replay){
   // círculo de alcance: se enciende cuando la pelota está a tiro de patada
   const rr=SIM.KR*view.ppm,rx=Math.max(8,Math.round(rr)),ry=Math.max(3,Math.round(rr*YC));
   const bb=s.ball,reach=bb.holder<0&&bb.z<=1.1&&Math.hypot(bb.x-p.x,bb.y-p.y)<=SIM.KR;
   if(reach&&!p.charging){const li0=game.lastInputs&&game.lastInputs[p.id];let dd=Math.hypot(bb.x-p.x,bb.y-p.y)||1,ux=(bb.x-p.x)/dd,uy=(bb.y-p.y)/dd;if(li0&&li0.aim){const ax=li0.tx-bb.x,ay=li0.ty-bb.y,al=Math.hypot(ax,ay);if(al>0.25){ux=ax/al;uy=ay/al;}}for(let i=1;i<=5;i++){const q=P(bb.x+ux*(0.35+i*0.45),bb.y+uy*(0.35+i*0.45),0);bx.fillStyle=`rgba(255,225,77,${0.9-i*0.15})`;bx.fillRect(Math.round(q[0]),Math.round(q[1]),1,1);}}
   if(reach&&!p.charging){ringPx(bx,sx,sy,rx,ry,'#ffe14d',false);ringPx(bx,sx,sy+1,rx,ry,'rgba(160,120,0,0.8)',false);}
   else if(reach)ringPx(bx,sx,sy,rx,ry,'rgba(255,225,77,0.55)',true);
   else ringPx(bx,sx,sy,rx,ry,hcol,true);
   if(p.charging)drawChargeRing(bx,sx,sy,p,rx,ry);
  }else if(human)pellipse(bx,sx,sy,7,2.5,hcol);
  const kit=bkit(game.kits[p.team],p);
  const spd=Math.hypot(p.vx,p.vy);
  const o=Object.assign({kit,skin:SKIN[p.skin|0],hair:p.hair||'#222',name:p.name,ready:false,hold:false,phase:p.run,moving:spd>0.6,num:p.num,gk:p.role==='gk',kick:p.kickAnim>0,kickT:p.kickAnim>0?1-p.kickAnim/0.18:null,kickW:p.charging?Math.min(1,p.charge):0,lean:!!p.spr},viewOf(p));
  let jy=Math.round((p.jz||0)*view.ppm*ZC);o.kick=false;o.kickT=null;o.kickW=0;
  {const hasB=!scn.replay&&s.ball.holder===p.id;
   if(p.hangT>0)o.hang=true;else if(p.dunkT>0)o.oneUp=true;else if(p.charging||p.shootT>0.12)o.armsUp=true;else if(p.jz>0.15)o.armsUp=true;
   else if(p.swipeT>0)o.reach=true;else if(p.kickAnim>0)o.chest=true;else if(hasB){o.dribble=true;o.dribZ=s.ball.z;}else if(p.pressing)o.stance=true;}
  if(p.headT>0){jy=Math.round(Math.sin(Math.min(1,1-p.headT/0.35)*Math.PI)*4);o.armsOut=true;o.moving=false;}
  if(p.role==='gk'&&!scn.replay){
   const bb=s.ball;o.hold=bb.holder===p.id;
   if(p.thrT>0)o.thr=1-p.thrT/0.3;
   else if(!o.hold&&!p.dive&&s.phase==='play'&&Math.hypot(bb.x-p.x,bb.y-p.y)<s.L*0.55&&Math.abs(Math.hypot(p.vx,p.vy))<4.5)o.ready=true;
  }
  if(!scn.replay&&s.phase==='goal'&&p.team===s.lastGoalTeam){o.cele=true;if(game.lastScorerId===p.id&&spd>1.5){o.armsOut=true;}else{jy=Math.round(Math.abs(Math.sin(now*9+p.id))*4);o.armsUp=true;}}
  const sk=p.skill;
  if(sk&&sk.type==='chilena'){
   // chilena: salto y vuelta en el aire de a cuartos de giro (sin perder el pixelado)
   const u=Math.min(1,sk.t/sk.dur),q=Math.min(3,Math.floor(u*5)),lift=Math.round(Math.sin(u*Math.PI)*9);
   bx.save();bx.translate(Math.round(sx),Math.round(sy)-11-lift);if(o.flip)bx.scale(-1,1);bx.rotate(-q*Math.PI/2);bx.translate(0,11);
   drawFootballer(bx,0,0,Object.assign(o,{view:'side',flip:false,kick:u>0.2&&u<0.6,moving:false}));bx.restore();
  }else if(sk&&p.slideT<=0){
   if(sk.type==='flick'){o.heel=sk.t<0.24;o.kick=false;}
   else if(sk.type==='roulette'){o.armsOut=true;o.moving=true;o.phase=sk.t*14;}
   else if(sk.type==='stepover'&&!sk.burst){const alt=Math.floor(sk.t/0.095)%2?1:-1;o.moving=false;o.armsOut=true;if(o.view==='side')o.kick=alt>0;else o.legOut=alt;}
   drawFootballer(bx,sx,sy-jy,o);
   if(sk.type==='roulette'||(sk.type==='stepover'&&!sk.burst)){bx.fillStyle='rgba(255,255,255,0.35)';const a=now*20;bx.fillRect(Math.round(sx+Math.cos(a)*6),Math.round(sy-2+Math.sin(a)*2),1,1);}
  }else if(p.slideT>0){
   bx.save();bx.translate(Math.round(sx),Math.round(sy)-2);if(p.slideDx<0)bx.scale(-1,1);bx.translate(7,0);bx.rotate(-Math.PI/2);
   drawFootballer(bx,0,0,Object.assign(o,{view:'side',flip:false,kick:true,moving:false}));bx.restore();
   bx.fillStyle='rgba(120,90,40,0.6)';bx.fillRect(Math.round(sx)-(p.slideDx<0?-8:12),Math.round(sy),4,1);
  }else if(p.dive){
   // dirección de la estirada en pantalla; si va casi vertical, se inclina un poco hacia la cancha para que se lea
   let ddx=p.dive.dx||0,ddy=(p.dive.dy||0)*YC;const fwd=p.team===0?1:-1;
   if(Math.abs(ddx)<0.35)ddx+=fwd*0.4;const dl=Math.hypot(ddx,ddy)||1;
   const ph=p.diveT<0.08?0:p.diveT<0.32?1:2,lift=ph===1?Math.round(2+Math.sin(Math.min(1,(p.diveT-0.08)/0.24)*Math.PI)*3):ph===0?1:0;
   drawDive(bx,Math.round(sx),Math.round(sy)-6,o,ddx/dl,ddy/dl,ph,lift);}
  else if(p.stunT>0&&p.stunT>0.6){bx.save();bx.translate(Math.round(sx),Math.round(sy)-2);if(o.flip)bx.scale(-1,1);bx.rotate(Math.PI/2);bx.translate(-6,0);drawFootballer(bx,0,0,Object.assign(o,{view:'side',flip:false,moving:false}));bx.restore();}
  else drawFootballer(bx,sx,sy-jy,o);
  if(!game.demo&&!scn.replay&&s.phase!=='goal'){
   // ▼ sobre el compañero que recibiría el pase (si la pelota está cerca de un jugador manejado por una persona)
   const hc=game.ctrls[p.id];
   if(hc&&hc.type==='human'&&p.role!=='gk'&&(!hc.peer||hc.peer===NET.me)){const bb=s.ball;
    if(bb.holder===p.id&&!p.charging){const li=game.lastInputs&&game.lastInputs[p.id];let dx=Math.cos(p.face),dy=Math.sin(p.face);
     if(li&&Math.hypot(li.mx,li.my)>0.3){const l=Math.hypot(li.mx,li.my);dx=li.mx/l;dy=li.my/l;}
     const q=SIM.passTarget(s,p,dx,dy,setup.assist==null?!!touch.on:!!setup.assist);
     if(q){const[qx,qy]=P(q.x,q.y,0),yy=Math.round(qy)-36+Math.round(Math.sin(now*8)*1);bx.fillStyle=hcol||'#ffe14d';bx.fillRect(Math.round(qx)-2,yy,5,1);bx.fillRect(Math.round(qx)-1,yy+1,3,1);bx.fillRect(Math.round(qx),yy+2,1,1);}}}
   // ! sobre los compañeros (CPU) que se desmarcan y están libres
   if(hc&&hc.type!=='human'&&p.role!=='gk'&&s.ball.lastTeam===p.team){const humanMate=s.players.some(q=>q.team===p.team&&game.ctrls[q.id].type==='human'&&(!game.ctrls[q.id].peer||game.ctrls[q.id].peer===NET.me)&&Math.hypot(s.ball.x-q.x,s.ball.y-q.y)<3);
    if(humanMate){let near=1e9;for(const o of s.players)if(o.team!==p.team)near=Math.min(near,Math.hypot(o.x-p.x,o.y-p.y));
     if(near>2.6&&Math.floor(now*3+p.id)%3!==0){const[qx,qy]=P(p.x,p.y,0);bx.fillStyle='#7dff4f';bx.fillRect(Math.round(qx),Math.round(qy)-34,1,3);bx.fillRect(Math.round(qx),Math.round(qy)-30,1,1);}}}
  }
  if(p.fire&&!scn.replay)drawFire(bx,sx,sy-jy,now);
  if(p.stunT>0){for(let k=0;k<2;k++){const a=now*7+k*Math.PI;bx.fillStyle='#ffe14d';bx.fillRect(Math.round(sx+Math.cos(a)*4),Math.round(sy-(p.stunT>0.6?10:27)+Math.sin(a)*1.5),1,1);}}

  if(human){const tx=Math.round(sx),ty=Math.round(sy)-29-jy;
   bx.fillStyle=hcol;bx.fillRect(tx-2,ty,5,1);bx.fillRect(tx-1,ty+1,3,1);bx.fillRect(tx,ty+2,1,1);
   if(p.stam<0.98&&!scn.replay){bx.fillStyle='#000';bx.fillRect(tx-6,ty-3,13,2);bx.fillStyle=p.stam>0.3?'#9be7ff':'#ff8a65';bx.fillRect(tx-6,ty-3,Math.round(13*p.stam),1);}}
 }
 drawGoalFrames(bx,s);
 if(!scn.replay||true)drawWeather(bx,game.paused?0:dt,s);
 // componer en pantalla
 let sc=Math.min(W/LW,H/LH);let ox=Math.round((W-LW*sc)/2),oy=Math.round((H-LH*sc)/2);
 if(fx.shake>0){fx.shake=Math.max(0,fx.shake-dt);const m=fx.shake*10*sc;ox+=Math.round((Math.random()-0.5)*m);oy+=Math.round((Math.random()-0.5)*m);}
 sctx.imageSmoothingEnabled=false;
 if(scn.replay){
  const CAMS=[['SIGUE A LA PELOTA',1.7],['AMPLIA',1],['TV',1.35],['BAJO EL ARO',2.1]],cm=(setup.rcam|0)%4,R=game.replay;
  const z=CAMS[cm][1],sw=LW/z,sh=LH/z,[bxp,byp]=P(b.x,b.y,0);let tx=bxp,ty=byp;
  if(cm===2){R.cx=R.cx==null?bxp:R.cx+(bxp-R.cx)*Math.min(1,dt*9);R.cy=R.cy==null?byp:R.cy+(byp-R.cy)*Math.min(1,dt*9);tx=R.cx;ty=R.cy;}
  if(cm===3){const gp=P((R.side||1)*s.L/2,0,0);tx=gp[0]*0.65+bxp*0.35;ty=gp[1]*0.6+byp*0.4;}
  const sx0=SIM.clamp(tx-sw/2,0,LW-sw),sy0=SIM.clamp(ty-sh/2,0,LH-sh);
  sctx.drawImage(buf,sx0,sy0,sw,sh,ox,oy,Math.round(LW*sc),Math.round(LH*sc));
  const bar=Math.round(H*0.07);sctx.fillStyle='#000';sctx.fillRect(0,0,W,bar);sctx.fillRect(0,H-bar,W,bar);
  const fs2=Math.max(16,Math.round(7*sc));sctx.font=`${fs2}px Silkscreen, monospace`;sctx.textAlign='left';sctx.textBaseline='middle';
  if(Math.floor(now*2)%2===0){sctx.fillStyle='#ff3b30';sctx.beginPath();sctx.arc(24*dpr,bar/2,fs2*0.3,0,Math.PI*2);sctx.fill();}
  sctx.fillStyle='#f3f0e2';sctx.fillText('REPETICIÓN',24*dpr+fs2*0.7,bar/2);
  sctx.font=`${Math.round(fs2*0.9)}px VT323, monospace`;sctx.textAlign='right';sctx.fillStyle='#93ad9f';sctx.fillText(touch.on?'Tocá: cámara · TIRAR: saltar':'C: cámara · Espacio: saltar',W-24*dpr,H-bar/2);sctx.textAlign='right';sctx.fillStyle='#ffb02e';sctx.fillText('CÁMARA: '+CAMS[cm][0],W-24*dpr,bar/2);
  if(game.replay.caption){sctx.textAlign='center';sctx.fillStyle='#ffb02e';sctx.font=`${fs2}px Silkscreen, monospace`;sctx.fillText(game.replay.caption,W/2,H-bar/2);}
 }else{
  const cam=game.cam||(game.cam={x:0,y:0,z:1});
  const follow=!game.demo&&s.L>=28&&setup.camFollow!==false;
  cam.z+=((follow?1.2:1)-cam.z)*Math.min(1,dt*3);
  {const vw=LW/cam.z,vh=LH/cam.z,[cbx,cby]=P(b.x,b.y,0);
   const tx0=SIM.clamp(cbx-vw/2,0,LW-vw),ty0=SIM.clamp(cby-vh/2+8,0,LH-vh);
   cam.x+=(tx0-cam.x)*Math.min(1,dt*2.6);cam.y+=(ty0-cam.y)*Math.min(1,dt*2.6);cam.x=SIM.clamp(cam.x,0,LW-vw);cam.y=SIM.clamp(cam.y,0,LH-vh);
   sctx.drawImage(buf,cam.x,cam.y,vw,vh,ox,oy,Math.round(LW*sc),Math.round(LH*sc));
   ox-=cam.x*sc*cam.z;oy-=cam.y*sc*cam.z;sc*=cam.z;}
  game.xf={ox,oy,sc};
  if(!game.demo&&mouseOn()&&!game.pens){const mx0=Math.round(mouse.x),my0=Math.round(mouse.y),u=Math.max(2,Math.round(sc));
   sctx.fillStyle='rgba(0,0,0,.7)';sctx.fillRect(mx0-5*u,my0-u,10*u+u,3*u);sctx.fillRect(mx0-u,my0-5*u,3*u,10*u+u);
   sctx.fillStyle='#3fd8ff';sctx.fillRect(mx0-5*u,my0,4*u,u);sctx.fillRect(mx0+2*u,my0,4*u,u);sctx.fillRect(mx0,my0-5*u,u,4*u);sctx.fillRect(mx0,my0+2*u,u,4*u);}
  // nombres nítidos sobre los jugadores humanos
  const fs=Math.max(14,Math.round(6*sc));
  sctx.font=`${fs}px VT323, monospace`;sctx.textAlign='center';sctx.textBaseline='bottom';
  if(!game.demo){
   const fs3=Math.max(11,Math.round(4.6*sc));sctx.font=`${fs3}px VT323, monospace`;
   for(const p of s.players){
    if(game.ctrls[p.id].type==='human')continue;
    const[sx,sy]=P(p.x,p.y,0);const tx=ox+sx*sc,ty=oy+(sy-26)*sc;const nm=p.name.length>12?p.name.slice(0,11)+'.':p.name;
    sctx.fillStyle='rgba(0,0,0,.6)';sctx.fillText(nm,tx+1,ty+1);sctx.fillStyle=p.team===0?'rgba(255,240,170,.85)':'rgba(220,235,255,.85)';sctx.fillText(nm,tx,ty);
   }
   sctx.font=`${fs}px VT323, monospace`;
  }
  if(!game.demo)for(const p of s.players){
   const c=game.ctrls[p.id];if(c.type!=='human')continue;
   const[sx,sy]=P(p.x,p.y,0);const tx=ox+sx*sc,ty=oy+(sy-33)*sc;
   const label=c.label||('P'+c.slot+' '+p.name);
   sctx.fillStyle='rgba(0,0,0,.75)';sctx.fillText(label,tx+2,ty+2);
   sctx.fillStyle=c.col||(c.slot===1?'#3fd8ff':'#ff5aa8');sctx.fillText(label,tx,ty);
   const bub=c.peer&&NET.bubbles&&NET.bubbles[c.peer];
   if(bub&&bub.until>performance.now()){const w=sctx.measureText(bub.text).width+fs*0.8,bh=fs*1.15,by=ty-fs*1.25;
    sctx.fillStyle='rgba(245,244,236,.95)';sctx.fillRect(tx-w/2,by-bh,w,bh);sctx.fillRect(tx-fs*0.2,by,fs*0.4,fs*0.3);
    sctx.fillStyle='#10231a';sctx.fillText(bub.text,tx,by-fs*0.08);}
  }
  // carteles: PERFECTO, PALO, ATAJADA, FALTA...
  const pf=Math.max(13,Math.round(5.5*sc));sctx.font=`${pf}px Silkscreen, monospace`;sctx.textAlign='center';sctx.textBaseline='bottom';
  for(let i=fx.popups.length-1;i>=0;i--){const q=fx.popups[i];q.t+=dt;if(q.t>1.1){fx.popups.splice(i,1);continue;}
   const[px2,py2]=P(q.x,q.y,0);const tx=ox+px2*sc,ty=oy+(py2-34-q.t*14)*sc;sctx.globalAlpha=q.t>0.75?1-(q.t-0.75)/0.35:1;
   sctx.fillStyle='#000';sctx.fillText(q.text,tx+2,ty+2);sctx.fillStyle=q.col;sctx.fillText(q.text,tx,ty);sctx.globalAlpha=1;}
 }
 if(fx.flash>0){sctx.fillStyle=`rgba(255,240,200,${fx.flash*0.5})`;sctx.fillRect(0,0,W,H);fx.flash=Math.max(0,fx.flash-dt*1.6);}
 if(game.demo){sctx.fillStyle='rgba(6,13,9,0.35)';sctx.fillRect(0,0,W,H);}
}

/* ===================== TANDA DE PENALES (primera persona) ===================== */
let penCrowd=null;
function startPens(){
 const s=game.state,T=[game.teams[0],game.teams[1]];
 const order=T.map(t=>[...t.players].sort((a,b)=>b.st[2]-a.st[2]));
 const ctrl=[0,1].map(team=>{const p=s.players.find(q=>q.team===team&&game.ctrls[q.id].type==='human');return p?game.ctrls[p.id].slot:0;});
 game.pens={T,order,ctrl,res:[[],[]],k:0,phase:'intro',t:0,clock:0,cur:null,hist:{shots:[[],[]],dives:[[],[]]},r:rng((s.tick*977+s.score[0]*31+13)|0),msg:null};
 penCrowd=null;keys.clear();tapped.clear();
 $('hud').hidden=true;$('banner').hidden=true;$('hint').hidden=true;
 sfx({t:'whistle'});
}
function penNextKick(P){
 const team=P.k%2,kt=1-team,count=P.res[team].length;
 const shooter=P.order[team][count%P.order[team].length],gk=P.T[kt].gk;
 const hs=P.ctrl[team],hk=P.ctrl[kt];
 P.cur={team,kt,shooter,gk,hs,hk,phase:'ready',t:0,aim:{x:0,y:1.1},charge:0,shot:null,dive:null,diveClock:null,kickClock:null,ft:0,result:null,
  cam:hs||!hk?'shooter':'keeper',reticle:!!hs&&!hk,run:0,runDur:0.9+P.r()*0.35,prevKick:true,prevDive:true};
 sfx({t:'whistle'});
}
// dónde está el mouse sobre el plano del arco (en metros: x lateral, y altura)
function penMouseGoal(P){
 if(!mouseOn()||!P.cam||!P.xf)return null;const cam=P.cam,xf=P.xf;
 const px=(mouse.x-xf.ox)/xf.sc,py=(mouse.y-xf.oy)/xf.sc,d=(PEN.D-cam.z)*cam.dir;if(d<0.15)return null;
 return{x:cam.x+(px-cam.cx)*d/(cam.f*cam.dir),y:cam.y-(py-cam.hy)*d/cam.f};
}
function penKeeperInput(P,c){
 if(!c.hk)return;
 const inp=readHuman(c.hk);
 if(c.dive){
  // margen corto para que dirección y botón no tengan que caer en el mismo cuadro
  if(c.diveClock!=null&&P.clock-c.diveClock<0.12&&c.dive.dx===0&&c.dive.dy===0){let dx=Math.sign(Math.round(inp.mx)),dy=-Math.sign(Math.round(inp.my));if(c.cam==='keeper')dx=-dx;if(dx||dy){c.dive.dx=dx;c.dive.dy=dy;}}
  return;
 }
 const mg=c.hk===1?penMouseGoal(P):null,kk=inp.kick||(mg&&mouse.l);
 const press=kk&&!c.prevDive;c.prevDive=kk;
 if(press){
  let dx=Math.sign(Math.round(inp.mx)),dy=-Math.sign(Math.round(inp.my));
  // vista del arquero: su izquierda es la derecha del pateador
  if(c.cam==='keeper')dx=-dx;
  // con mouse: se tira hacia donde está la mira (al medio si está cerca del centro; arriba si está alta)
  if(mg){dx=Math.abs(mg.x)<0.75?0:Math.sign(mg.x);dy=mg.y>1.35?1:0;}
  c.dive={dx,dy,t:0};c.diveClock=P.clock;
  sfx({t:'dive'});
  if(c.kickClock!=null)c.dive.t=P.clock-c.kickClock;
 }
}
function penKick(P){
 const c=P.cur;c.kickClock=P.clock;
 if(c.hs)c.shot=PEN.humanShot(c.aim,c.charge,c.shooter,c.reticle,P.clock);
 else{const early=c.dive&&c.diveClock!=null?c.dive:null;c.shot=PEN.cpuShot(c.shooter,P.hist.dives[c.kt],early,P.r);}
 if(c.dive&&c.diveClock!=null)c.dive.t=c.diveClock-c.kickClock;
 if(!c.hk)c.dive=PEN.cpuDive(c.gk,P.hist.shots[c.team],P.r);
 c.phase='flight';c.ft=0;c.T=PEN.D/c.shot.speed;
 sfx({t:'kick',power:c.shot.speed});
}
function penUpdate(dt0){
 const P=game.pens;
 if(P.hitstop>0){P.hitstop-=dt0;return;}
 let dt=dt0;
 // cámara lenta en el último tramo de la pelota
 if(P.cur&&P.cur.phase==='flight'&&P.cur.T-P.cur.ft<0.18)dt*=0.35;
 P.t+=dt;P.clock+=dt;
 if(P.phase==='intro'){if(P.t>1.6){P.phase='kicks';penNextKick(P);}return;}
 if(P.phase==='final'){if(P.t>2.6&&!P.ended){P.ended=true;game.pensResult=[P.res[0].filter(Boolean).length,P.res[1].filter(Boolean).length];game.pens=null;$('hint').hidden=true;showEnd();}return;}
 const c=P.cur;c.t+=dt;
 if(c.phase==='ready'){if(c.t>0.9){c.phase='aim';c.t=0;}penKeeperInput(P,c);return;}
 if(c.phase==='aim'||c.phase==='run'){
  penKeeperInput(P,c);
  if(c.hs){
   const inp=readHuman(c.hs),mg=c.hs===1?penMouseGoal(P):null;
   if(mg){c.aim.x=SIM.clamp(mg.x,-4.6,4.6);c.aim.y=SIM.clamp(mg.y,0,3.2);inp.kick=inp.kick||mouse.l;}
   else{c.aim.x=SIM.clamp(c.aim.x+inp.mx*3*dt,-4.6,4.6);c.aim.y=SIM.clamp(c.aim.y-inp.my*2.4*dt,0,3.2);}
   if(c.phase==='aim'){if(inp.kick&&!c.prevKick){c.phase='run';c.charge=0;}}
   else{c.charge+=dt;c.run=Math.min(1,c.charge/0.8);if(!inp.kick||c.charge>=1.4)penKick(P);}
   c.prevKick=inp.kick;
  }else{
   if(c.phase==='aim'&&c.t>0.5){c.phase='run';c.t=0;}
   if(c.phase==='run'){c.run=Math.min(1,c.t/c.runDur);if(c.t>=c.runDur)penKick(P);}
  }
  return;
 }
 if(c.phase==='flight'){
  c.ft+=dt;penKeeperInput(P,c);
  if(c.ft>=c.T){
   const o=PEN.resolve(c.shot,c.dive,c.gk);c.result=o.r;c.phase='after';c.t=0;
   const goal=PEN.isGoal(o.r);P.res[c.team].push(goal);P.hist.shots[c.team].push(c.shot.x);P.hist.dives[c.kt].push(c.dive?c.dive.dx:0);
   const humanKeeper=!!c.hk,humanShooter=!!c.hs;
   P.msg={text:goal?'¡GOL!':o.r==='save'?(humanKeeper&&!humanShooter?'¡ATAJASTE!':'¡ATAJÓ!'):o.r==='post'?'¡PALO!':o.r==='bar'?'¡TRAVESAÑO!':'¡AFUERA!',
    col:goal?(humanShooter||!humanKeeper?'#7dff4f':'#ff5a4f'):(humanKeeper&&!humanShooter?'#7dff4f':'#ff5a4f'),t:0};
   if(goal)sfx({t:'goal'});else if(o.r==='save')sfx({t:'catch'});else if(o.r==='post'||o.r==='bar')sfx({t:'post'});else sfx({t:'net'});
   if(goal)fx.shake=0.3;P.hitstop=0.12;P.flash=goal?0.45:0.2;
  }
  return;
 }
 if(c.phase==='after'){
  c.ft+=dt;
  if(c.t>1.9){
   if(PEN.decided(P.res)){P.phase='final';P.t=0;sfx({t:'end'});
    const a=P.res[0].filter(Boolean).length,b=P.res[1].filter(Boolean).length,w=a>b?0:1;
    P.msg={text:'GANA '+P.T[w].abbr,col:'#ffb02e',t:0,sub:`Penales ${a}-${b}`};spawnConfettiPens(game.kits[w]);}
   else{P.k++;penNextKick(P);P.msg=null;}
  }
 }
}
function keeperState(c,P){return PEN.keeperAt(c.dive,c.kickClock!=null?P.clock-c.kickClock:(c.dive&&c.diveClock!=null?P.clock-c.diveClock:0),c.gk);}
function ballPos(c){
 // trayectoria de la pelota: antes de patear está en el punto; después vuela hacia (x,y) del arco
 if(!c.shot)return{x:0,y:PEN.BR,z:0};
 const T=c.T,u=Math.min(1,c.ft/T),s=c.shot;
 let x=s.x*u,z=PEN.D*u,y=PEN.BR+(s.y-PEN.BR)*u+Math.sin(Math.PI*u)*0.25*(1-Math.min(1,s.y/2.44));
 if(c.phase==='after'){
  const a=Math.min(1,c.t/0.6),r=c.result;
  if(r==='goal'){z=PEN.D+1.6*a;y=Math.max(PEN.BR,s.y*(1-a*a));x=s.x*(1+0.1*a);}
  else if(r==='save'){const k=PEN.keeperAt(c.dive,c.T,c.gk);const away=Math.sign(s.x-k.kx||1);x=s.x+away*2.2*a;z=PEN.D-3.5*a;y=Math.max(PEN.BR,s.y*(1-a)+Math.sin(Math.PI*a)*0.6);}
  else if(r==='post'||r==='bar'){x=s.x+Math.sign(s.x||1)*1.5*a;z=PEN.D-2*a;y=Math.max(PEN.BR,s.y+(r==='bar'?0.8:0)*Math.sin(Math.PI*a));}
  else{z=PEN.D+5*a;x=s.x*(1+0.4*a);y=s.y+0.5*a;}
 }
 return{x,y,z};
}
/* ---------- penales: dibujo pixel en alta definición ----------
   Buffer propio de 640×400 (más píxeles que el partido) y personajes grandes dibujados píxel a píxel
   desde un esqueleto: así se pueden animar y rotar (estiradas, caídas) sin perder el pixelado. */
const PW=640,PH=400;
function pproj(cam,X,Y,Z){const d=(Z-cam.z)*cam.dir;if(d<0.15)return null;return[cam.cx+(X-cam.x)*cam.f/d*cam.dir,cam.hy-(Y-cam.y)*cam.f/d,cam.f/d];}
const pbuf=document.createElement('canvas');pbuf.width=PW;pbuf.height=PH;const pg=pbuf.getContext('2d');
const SPANS={};
function spansOf(r){if(SPANS[r])return SPANS[r];const a=[];for(let dy=-r;dy<=r;dy++)a.push(Math.floor(Math.sqrt(Math.max(0,r*r-dy*dy))+0.4));return SPANS[r]=a;}
function disc(g,cx,cy,r,col){const ri=Math.max(0,Math.round(r));const s=spansOf(ri);g.fillStyle=col;const x=Math.round(cx),y=Math.round(cy);for(let i=0;i<s.length;i++)g.fillRect(x-s[i],y-ri+i,s[i]*2+1,1);}
function ellipseF(g,cx,cy,rx,ry,col){g.fillStyle=col;const y0=Math.round(cy-ry),y1=Math.round(cy+ry);for(let y=y0;y<=y1;y++){const t=(y+0.5-cy)/ry;if(Math.abs(t)>1)continue;const hw=rx*Math.sqrt(1-t*t);g.fillRect(Math.round(cx-hw),y,Math.max(1,Math.round(hw*2)),1);}}
function segD(g,a,b,r,col){const d=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.ceil(d/Math.max(0.8,r*0.55)));for(let i=0;i<=n;i++){const t=i/n;disc(g,a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,r,col);}}
function polyFill(g,pts,col){
 let y0=Infinity,y1=-Infinity;for(const p of pts){if(p[1]<y0)y0=p[1];if(p[1]>y1)y1=p[1];}
 y0=Math.floor(y0);y1=Math.ceil(y1);
 for(let y=y0;y<=y1;y++){const yc=y+0.5;let xl=Infinity,xr=-Infinity;
  for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];if((a[1]<=yc&&b[1]>yc)||(b[1]<=yc&&a[1]>yc)){const x=a[0]+(yc-a[1])/(b[1]-a[1])*(b[0]-a[0]);if(x<xl)xl=x;if(x>xr)xr=x;}}
  if(xl>xr)continue;const xa=Math.round(xl),xb=Math.round(xr);if(xb<=xa)continue;
  if(typeof col==='string'){g.fillStyle=col;g.fillRect(xa,y,xb-xa,1);continue;}
  let rc=null,rs=xa;for(let x=xa;x<=xb;x++){const c=x<xb?col(x+0.5,yc):null;if(c!==rc){if(rc){g.fillStyle=rc;g.fillRect(rs,y,x-rs,1);}rc=c;rs=x;}}
 }
}
const SHADE={};
function sh(c,t){const k=c+t;if(SHADE[k])return SHADE[k];const v=parseInt(c.slice(1),16);const f=x=>Math.max(0,Math.min(255,Math.round(t>0?x+(255-x)*t:x*(1+t))));const o='#'+[(v>>16)&255,(v>>8)&255,v&255].map(f).map(x=>x.toString(16).padStart(2,'0')).join('');return SHADE[k]=o;}

/* ---- poses (unidades: el jugador mide 24; origen en los pies; y hacia arriba es negativo) ---- */
const POSE_BASE={hipL:[-1.3,-11],hipR:[1.3,-11],kneeL:[-1.45,-6],kneeR:[1.45,-6],footL:[-1.55,-0.6],footR:[1.55,-0.6],
 shL:[-2.7,-18],shR:[2.7,-18],elL:[-3.5,-14.6],elR:[3.5,-14.6],haL:[-3.8,-11.4],haR:[3.8,-11.4],neck:[0,-19.3],head:[0,-21.8]};
function pose(over){const j={};for(const k in POSE_BASE)j[k]=POSE_BASE[k].slice();if(over)for(const k in over)j[k]=over[k].slice();return j;}
function lerpPose(a,b,t){const o={};for(const k in a)o[k]=[a[k][0]+(b[k][0]-a[k][0])*t,a[k][1]+(b[k][1]-a[k][1])*t];return o;}
function shiftY(j,dy,keepFeet){for(const k in j){if(keepFeet&&(k==='footL'||k==='footR'))continue;j[k][1]+=dy;}return j;}
function poseStand(t){return shiftY(pose(),Math.sin(t*2.4)*0.15,true);}
function poseKeeperReady(t){
 const j=pose({hipL:[-1.5,-9.6],hipR:[1.5,-9.6],kneeL:[-2.6,-5.3],kneeR:[2.6,-5.3],footL:[-2.7,-0.6],footR:[2.7,-0.6],
  shL:[-2.8,-16.6],shR:[2.8,-16.6],elL:[-4.6,-14],elR:[4.6,-14],haL:[-5.4,-15.8],haR:[5.4,-15.8],neck:[0,-17.9],head:[0,-20.4]});
 return shiftY(j,-Math.abs(Math.sin(t*7))*0.55,true);
}
function poseStretch(){return pose({kneeL:[-1.3,-6],kneeR:[1.1,-6.2],footL:[-1.2,-0.6],footR:[0.9,-0.8],elL:[-2.1,-22.8],elR:[2.1,-22.8],haL:[-2.3,-26.6],haR:[2.3,-26.6],head:[0,-21.9]});}
function poseHug(){return pose({kneeL:[-1.6,-6.5],kneeR:[0.8,-7],footL:[-1.4,-1],footR:[1.6,-2.2],elL:[-2.6,-15.2],elR:[2.6,-15.2],haL:[-0.9,-16.4],haR:[0.9,-16.4]});}
function poseSad(t){return pose({elL:[-3.4,-21.4],elR:[3.4,-21.4],haL:[-1.3,-22.9],haR:[1.3,-22.9],head:[0.15,-21.4],neck:[0.05,-19.1]});}
function poseArmsUp(t){const j=pose({elL:[-3.6,-21.6],elR:[3.6,-21.6],haL:[-3.9,-25],haR:[3.9,-25],kneeL:[-1.6,-6.4],kneeR:[1.6,-6.4]});return shiftY(j,-Math.abs(Math.sin(t*9))*2.2,false);}
function poseRun(ph,arms){
 const lL=Math.max(0,Math.sin(ph)),lR=Math.max(0,Math.sin(ph+Math.PI));
 const j=pose({kneeL:[-1.25+lL*0.3,-6-lL*3.4],footL:[-1.35,-0.6-lL*3.9],kneeR:[1.25-lR*0.3,-6-lR*3.4],footR:[1.35,-0.6-lR*3.9],
  shL:[-2.7,-17.4],shR:[2.7,-17.4],neck:[0,-18.7],head:[0,-21.2],
  elL:[-3.6,-14.4-lR*1.6],haL:[-3.4+lR*0.6,-11.6-lR*3.6],elR:[3.6,-14.4-lL*1.6],haR:[3.4-lL*0.6,-11.6-lL*3.6]});
 if(arms==='plane'){j.elL=[-5,-17.4];j.haL=[-7.4,-17.8];j.elR=[5,-17.4];j.haR=[7.4,-17.8];}
 if(arms==='up'){j.elL=[-3.4,-21.2];j.haL=[-3.6,-24.8];j.elR=[3.4,-21.2];j.haR=[3.6,-24.8];}
 return shiftY(j,-Math.abs(Math.sin(ph))*0.7,false);
}
function poseKick(k){
 // tres tiempos: apoyo y pierna atrás → impacto → acompañamiento
 const j=pose({kneeL:[-1.7,-5.6],footL:[-1.9,-0.6],elL:[-5.4,-15.8],haL:[-7,-16.8],elR:[4.4,-12.5],haR:[4.6,-9.6],shL:[-2.8,-17.6],shR:[2.6,-17.8]});
 if(k<0.45){const t=k/0.45;j.kneeR=[1.5,-6-t*2.2];j.footR=[1.7,-1-t*8.5];}
 else{const t=Math.min(1,(k-0.45)/0.35);j.kneeR=[1.4-t*0.6,-8.2-t*1.6];j.footR=[1.6-t*1.2,-9.5-t*3.6];}
 return j;
}

/* ---- dibujo del jugador grande ---- */
const DIGIT3={0:['###','#.#','#.#','#.#','###'],1:['.#.','##.','.#.','.#.','###'],2:['###','..#','###','#..','###'],3:['###','..#','.##','..#','###'],4:['#.#','#.#','###','..#','..#'],5:['###','#..','###','..#','###'],6:['###','#..','###','#.#','###'],7:['###','..#','.#.','.#.','.#.'],8:['###','#.#','###','#.#','###'],9:['###','#.#','###','..#','###']};
function patternAt(k,lx,ly){
 switch(k.pat){
  case'vstripes':return Math.floor((lx+1)*3.2)%2?k.s:k.p;
  case'hband':return ly>0.33&&ly<0.62?k.s:k.p;
  case'sash':return Math.abs(ly-(1-(lx+1)/2))<0.17?k.s:k.p;
  case'hoops':return Math.floor(ly*7)%2?k.s:k.p;
  case'halves':return lx<0?k.p:k.s;
  case'vee':return ly>0.5&&Math.abs(Math.abs(lx)-(ly-0.5)*1.9)<0.16?k.s:k.p;
  case'vband':return Math.abs(lx)<0.22?k.s:k.p;
  default:return k.p;
 }
}
function bigPlayer(g,ox,oy,H,o){
 const u=H/24,J=o.j,rot=o.rot||0,pv=o.pivot||[0,-11],c=Math.cos(rot),s=Math.sin(rot),lift=o.lift||0;
 const T=p=>[ox+(c*(p[0]-pv[0])-s*(p[1]-pv[1])+pv[0])*u,oy+(s*(p[0]-pv[0])+c*(p[1]-pv[1])+pv[1])*u-lift];
 const L=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
 const k=o.kit,skin=o.skin,hair=o.hair,OL='#0c120f';
 const P={};for(const n in J)P[n]=T(J[n]);
 const ru=x=>Math.max(1,x*u);
 // partes: [a,b,radio,color]
 const legs=[],arms=[];
 for(const sd of ['L','R']){
  const hip=J['hip'+sd],kn=J['knee'+sd],ft=J['foot'+sd];
  legs.push([T(hip),T(L(hip,kn,0.5)),1.25,k.shorts],[T(L(hip,kn,0.45)),T(kn),1.0,skin],[T(kn),T(L(kn,ft,0.2)),0.9,skin],[T(L(kn,ft,0.18)),T(ft),0.92,k.socks]);
  const sh0=J['sh'+sd],el=J['el'+sd],ha=J['ha'+sd];
  arms.push([T(sh0),T(L(sh0,el,0.55)),0.88,k.sleeve],[T(L(sh0,el,0.5)),T(el),0.72,skin],[T(el),T(ha),0.66,skin]);
 }
 const boots=['L','R'].map(sd=>{const ft=J['foot'+sd];return[T(ft),T([ft[0]+(sd==='L'?-0.25:0.25),ft[1]+0.35])];});
 const hands=['L','R'].map(sd=>T(J['ha'+sd]));
 const hipC=L(J.hipL,J.hipR,0.5),shC=L(J.shL,J.shR,0.5);
 const torso=[[J.shL[0]-0.3,J.shL[1]-0.35],[J.shR[0]+0.3,J.shR[1]-0.35],[J.hipR[0]+0.55,J.hipR[1]-0.9],[J.hipL[0]-0.55,J.hipL[1]-0.9]].map(T);
 const shorts=[[J.hipL[0]-0.6,J.hipL[1]-1.1],[J.hipR[0]+0.6,J.hipR[1]-1.1],L(J.hipR,J.kneeR,0.4).map((v,i)=>i?v:v+0.95),L(J.hipL,J.kneeL,0.4).map((v,i)=>i?v:v-0.95)].map(T);
 const head=T(J.head),neck=T(J.neck),hr=2.35*u;
 // 1) contorno
 for(const p of [...legs,...arms])segD(g,p[0],p[1],ru(p[2])+1,OL);
 for(const b of boots)segD(g,b[0],b[1],ru(0.95)+1,OL);
 for(const h of hands)disc(g,h[0],h[1],ru(o.gk?1.05:0.72)+1,OL);
 const grow=(pts,d)=>{const cx=pts.reduce((a,p)=>a+p[0],0)/pts.length,cy=pts.reduce((a,p)=>a+p[1],0)/pts.length;return pts.map(p=>{const dx=p[0]-cx,dy=p[1]-cy,l=Math.hypot(dx,dy)||1;return[p[0]+dx/l*d,p[1]+dy/l*d];});};
 polyFill(g,grow(torso,1.4),OL);polyFill(g,grow(shorts,1.4),OL);
 segD(g,neck,head,ru(0.8)+1,OL);disc(g,head[0],head[1],hr+1,OL);
 // 2) relleno: piernas, botines, short, torso, brazos, cabeza
 for(const p of legs){segD(g,p[0],p[1],ru(p[2]),p[3]);}
 for(const p of legs){if(p[3]===k.socks)segD(g,[p[0][0]-ru(0.35),p[0][1]],[p[1][0]-ru(0.35),p[1][1]],Math.max(0.5,ru(0.25)),sh(k.socks,0.25));}
 for(const b of boots){segD(g,b[0],b[1],ru(0.95),'#161616');g.fillStyle='#e8e8e8';g.fillRect(Math.round(b[0][0]-ru(0.5)),Math.round(b[0][1]),Math.max(1,Math.round(ru(1))),1);}
 polyFill(g,shorts,k.shorts);
 polyFill(g,shorts.slice(0,2).concat([L(shorts[1],shorts[2],0.25),L(shorts[0],shorts[3],0.25)]),sh(k.shorts,-0.12));
 // camiseta con diseño en coordenadas del torso (sigue al cuerpo aunque rote)
 const hc=T(hipC),sc=T(shC);let ay=[sc[0]-hc[0],sc[1]-hc[1]];const tl=Math.hypot(...ay)||1;ay=[ay[0]/tl,ay[1]/tl];const ax=[-ay[1],ay[0]];
 const halfW=2.9*u,front=!o.back;
 polyFill(g,torso,(x,y)=>{const dx=x-hc[0],dy=y-hc[1];let lx=(dx*ax[0]+dy*ax[1])/halfW,ly=(dx*ay[0]+dy*ay[1])/tl;
  if(!front)lx=-lx;
  if(front&&ly>0.9&&Math.abs(lx)<0.26)return k.collar||k.s;
  if(front&&ly>0.68&&ly<0.8&&lx>-0.5&&lx<-0.3)return k.s===k.p?(k.collar||k.num):k.s;
  let col=patternAt(k,lx,ly);
  if(lx>0.62)col=sh(col,-0.16);else if(lx<-0.66)col=sh(col,0.12);
  return col;});
 if(o.back&&o.num!=null){const str=String(o.num),ps=Math.max(1,Math.round(u*0.75)),w=str.length*4*ps-ps;const cx=(hc[0]+sc[0])/2,cy=(hc[1]+sc[1])/2-ps*2.5;
  g.fillStyle=k.num;for(let d=0;d<str.length;d++){const rows=DIGIT3[str[d]];for(let r=0;r<5;r++)for(let q=0;q<3;q++)if(rows[r][q]==='#')g.fillRect(Math.round(cx-w/2+d*4*ps+q*ps),Math.round(cy+r*ps),ps,ps);}}
 // número chico en el short
 if(!o.back&&o.num!=null&&u>2.2){const str=String(o.num),p0=shorts[0],ps=1;g.fillStyle=k.num===k.shorts?k.s:k.num;const bx0=Math.round(p0[0]+u*0.9),by0=Math.round(p0[1]+u*1.2);
  for(let d=0;d<str.length;d++){const rows=DIGIT3[str[d]];for(let r=0;r<5;r++)for(let q=0;q<3;q++)if(rows[r][q]==='#')g.fillRect(bx0+d*4+q,by0+r,1,1);}}
 for(const p of arms){segD(g,p[0],p[1],ru(p[2]),p[3]);}
 for(const sd of [0,1]){const p=arms[sd*3];segD(g,[p[0][0]+ru(0.3),p[0][1]],[p[1][0]+ru(0.3),p[1][1]],Math.max(0.5,ru(0.25)),sh(k.sleeve,-0.18));}
 for(const h of hands){if(o.gk){disc(g,h[0],h[1],ru(1.05),'#f1f1ec');disc(g,h[0]+ru(0.25),h[1]+ru(0.25),ru(0.5),'#c9c9c2');}else disc(g,h[0],h[1],ru(0.72),skin);}
 segD(g,neck,head,ru(0.8),sh(skin,-0.1));
 // cabeza píxel a píxel: pelo, cara y expresión, también rotada
 const hx=head[0],hy=head[1],R2=hr*hr,ci=Math.cos(-rot),si=Math.sin(-rot);
 for(let y=Math.floor(hy-hr);y<=Math.ceil(hy+hr);y++){let run=null,rs=0;const x0=Math.floor(hx-hr),x1=Math.ceil(hx+hr);
  for(let x=x0;x<=x1+1;x++){let col=null;const dx=x+0.5-hx,dy=y+0.5-hy;
   if(x<=x1&&dx*dx+dy*dy<=R2){const lx=(ci*dx-si*dy)/hr,ly=(si*dx+ci*dy)/hr;
    if(o.back)col=ly>0.55?skin:hair;
    else if(ly<-0.32||(Math.abs(lx)>0.8&&ly<0.15))col=hair;
    else col=lx>0.55?sh(skin,-0.14):skin;}
   if(col!==run){if(run){g.fillStyle=run;g.fillRect(rs,y,x-rs,1);}run=col;rs=x;}}}
 if(!o.back){
  const F=(lx,ly)=>[hx+(c*lx-s*ly)*hr,hy+(s*lx+c*ly)*hr];const px=Math.max(1,Math.round(u*0.42));
  for(const sx of [-1,1]){const e=F(sx*0.38,0.05);g.fillStyle='#16110d';g.fillRect(Math.round(e[0]-px/2),Math.round(e[1]),px,px+(u>3?1:0));
   const b=F(sx*0.4,-0.2);g.fillStyle=sh(hair,0.1);g.fillRect(Math.round(b[0]-px),Math.round(b[1]),px*2,1);}
  const m=F(0,0.55);g.fillStyle=sh(skin,-0.35);
  if(o.face==='happy'){g.fillRect(Math.round(m[0]-px*1.5),Math.round(m[1]),px*3,px);g.fillStyle='#f5f5f0';g.fillRect(Math.round(m[0]-px),Math.round(m[1]),px*2,1);}
  else if(o.face==='sad'){g.fillRect(Math.round(m[0]-px),Math.round(m[1]+1),px*2,1);g.fillRect(Math.round(m[0]-px*1.5),Math.round(m[1]+2),1,1);g.fillRect(Math.round(m[0]+px*1.5),Math.round(m[1]+2),1,1);}
  else g.fillRect(Math.round(m[0]-px),Math.round(m[1]),px*2,1);
 }
 return{head,hands};
}

/* ---- estadio ---- */
let penScene=null;
function buildPenScene(){
 let seed=9;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
 const fans=[];const k0=game.kits[0],k1=game.kits[1];
 const neutral=['#2f3f37','#3d4a42','#55606a','#6b5b4a','#283642','#4a3a5a'];
 for(let row=0;row<26;row++){const y=12+row*5.2,s=2+row*0.09;for(let x=-4;x<PW+4;x+=s*1.9+rnd()*1.4){if(rnd()<0.08)continue;
  const team=x<PW/2?0:1,fan=rnd()<0.78,k=team?k1:k0;fans.push({x,y:y+rnd()*1.5,s,c:fan?(rnd()<0.62?k.p:k.s):neutral[Math.floor(rnd()*neutral.length)],sk:SKIN[Math.floor(rnd()*4)],ph:rnd()*6.28,team:fan?team:-1,flag:fan&&rnd()<0.03});}}
 const noise=document.createElement('canvas');noise.width=PW;noise.height=PH;const ng=noise.getContext('2d');
 for(let i=0;i<9000;i++){ng.fillStyle=rnd()<0.5?'rgba(0,0,0,0.11)':'rgba(255,255,255,0.06)';ng.fillRect(Math.floor(rnd()*PW),Math.floor(rnd()*PH),rnd()<0.3?2:1,1);}
 const led=document.createElement('canvas');led.width=900;led.height=14;const lg=led.getContext('2d');
 const ads=[['#c8102e','#ffffff','PICADITO PIXEL'],['#0b3d91','#ffd400','FERNET 1882'],['#141414','#7cfc00','CHORI & PAN'],['#f2a900','#1a1a1a','MATE COCIDO'],['#f4f4f2','#0b3d91','EL POTRERO'],['#5b2a86','#ffffff','ASADO FC']];
 lg.font='8px Silkscreen, monospace';lg.textBaseline='middle';lg.textAlign='center';
 ads.forEach((a,i)=>{lg.fillStyle=a[0];lg.fillRect(i*150,0,150,14);lg.fillStyle=a[1];lg.fillText(a[2],i*150+75,8);});
 return{fans,noise,led};
}
function drawSky(g,hz){
 const gr=g.createLinearGradient(0,0,0,hz);gr.addColorStop(0,'#03070c');gr.addColorStop(1,'#0c1a1d');g.fillStyle=gr;g.fillRect(0,0,PW,hz);
}
function drawLights(g,t){
 for(const sx of [-1,1]){const x=sx<0?36:PW-36,y=10;
  const gl=g.createRadialGradient(x,y+8,2,x,y+8,70);gl.addColorStop(0,'rgba(255,250,220,0.35)');gl.addColorStop(1,'rgba(255,250,220,0)');g.fillStyle=gl;g.fillRect(x-70,y-60,140,140);
  g.fillStyle='#2a2f33';g.fillRect(x-17,y-3,34,22);
  for(let r=0;r<3;r++)for(let q=0;q<5;q++){g.fillStyle=(Math.floor(t*3)+r+q)%9===0?'#ffffff':'#fff6c8';g.fillRect(x-15+q*6,y-1+r*7,5,5);}
  g.fillStyle='#1d2226';g.fillRect(x-2,y+19,4,26);
 }
}
function drawCrowd(g,yTop,yBot,t,cheer){
 const S=penScene;const sc=(yBot-yTop)/150;
 for(const f of S.fans){const y=yTop+f.y*sc;if(y>yBot-2)continue;const s=f.s*Math.max(0.7,sc);
  const ch=cheer&&f.team===cheer.team;const j=ch?Math.abs(Math.sin(t*10+f.ph))*s*1.4:Math.max(0,Math.sin(t*2+f.ph))*s*0.15;
  const yy=Math.round(y-j),xx=Math.round(f.x),w=Math.max(2,Math.round(s*1.5)),h=Math.max(2,Math.round(s*1.4));
  g.fillStyle=f.c;g.fillRect(xx-(w>>1),yy,w,h);
  if(ch){g.fillRect(xx-(w>>1)-1,yy-h,1,h);g.fillRect(xx+(w>>1)+(w%2),yy-h,1,h);}
  g.fillStyle=f.sk;const hs=Math.max(1,Math.round(s*0.9));g.fillRect(xx-(hs>>1),yy-hs,hs,hs);
  if(f.flag){g.fillStyle='#4a3a2a';g.fillRect(xx+w,yy-h*3,1,h*3);g.fillStyle=f.c;const wv=Math.round(Math.sin(t*6+f.ph)*1.5);g.fillRect(xx+w+1,yy-h*3+wv,Math.round(s*3),Math.round(s*2));}
 }
 const sh0=g.createLinearGradient(0,yTop,0,yBot);sh0.addColorStop(0,'rgba(3,7,12,0.55)');sh0.addColorStop(1,'rgba(3,7,12,0)');g.fillStyle=sh0;g.fillRect(0,yTop,PW,yBot-yTop);
}
function drawLED(g,x0,y0,x1,y1,t){
 const S=penScene,w=x1-x0,h=y1-y0;if(w<4||h<2)return;const off=(t*40)%900;
 g.imageSmoothingEnabled=false;
 const sw=w*14/h;let x=0;
 while(x<w){const src=(off+x*14/h)%900,take=Math.min(900-src,(w-x)*14/h);g.drawImage(S.led,src,0,take,14,x0+x,y0,take*h/14,h);x+=take*h/14;}
 g.fillStyle='rgba(0,0,0,0.28)';for(let i=x0;i<x1;i+=2)g.fillRect(Math.round(i),y0,1,h);
 g.fillStyle='rgba(0,0,0,0.5)';g.fillRect(x0,y1-1,w,1);
}
function quadP(g,cam,a,b,c,d,col){const P=[a,b,c,d].map(p=>pproj(cam,...p));if(P.some(q=>!q))return;polyFill(g,P,col);}
function lineW(g,cam,a,b,w,col){const dx=b[2]-a[2],dz=b[0]-a[0];const l=Math.hypot(dx,dz)||1;const nx=-dx/l*w/2,nz=dz/l*w/2;
 quadP(g,cam,[a[0]+nx,0.001,a[2]+nz],[b[0]+nx,0.001,b[2]+nz],[b[0]-nx,0.001,b[2]-nz],[a[0]-nx,0.001,a[2]-nz],col);}
function drawPitch(g,cam,zFrom,zTo){
 const hz=cam.hy;g.fillStyle='#2b7432';g.fillRect(0,Math.floor(hz),PW,PH-hz);
 for(let z=Math.floor(zFrom/2)*2;z<zTo;z+=2){if(((z/2)%2+2)%2)continue;quadP(g,cam,[-40,0,z],[40,0,z],[40,0,z+2],[-40,0,z+2],'#318140');}
 g.drawImage(penScene.noise,0,Math.floor(hz),PW,PH-hz,0,Math.floor(hz),PW,PH-hz);
 const W='#ecebdf',D=PEN.D;
 lineW(g,cam,[-30,0,D],[30,0,D],0.12,W);
 lineW(g,cam,[-9.16,0,D-5.5],[9.16,0,D-5.5],0.12,W);
 for(const sx of [-1,1]){lineW(g,cam,[sx*9.16,0,D-5.5],[sx*9.16,0,D],0.12,W);lineW(g,cam,[sx*20.16,0,D-16.5],[sx*20.16,0,D],0.12,W);}
 lineW(g,cam,[-20.16,0,D-16.5],[20.16,0,D-16.5],0.12,W);
 const sp=pproj(cam,0,0,0);if(sp)ellipseF(g,sp[0],sp[1],0.16*sp[2],0.05*sp[2],W);
}
function drawGoalHD(g,cam,c,P){
 const W=PEN.W,H=PEN.H,Z=PEN.D,ZB=Z+1.9;
 const rip=c&&c.phase==='after'&&c.result==='goal'?{x:c.shot.x,y:c.shot.y,t:c.t}:null;
 const bz=(x,y)=>{if(!rip)return ZB;const d=Math.hypot(x-rip.x,y-rip.y);return ZB+Math.max(0,0.9*Math.exp(-rip.t*2.5)*Math.cos(rip.t*14-d*3))*Math.exp(-d*0.7);};
 const net='rgba(236,236,226,0.45)';
 for(let i=0;i<=24;i++){const x=-W+i*2*W/24;let lp=null;for(let j=0;j<=10;j++){const y=H*j/10,q=pproj(cam,x,y,bz(x,y));if(lp&&q)pline(g,lp[0],lp[1],q[0],q[1],net);lp=q;}}
 for(let j=0;j<=10;j++){const y=H*j/10;let lp=null;for(let i=0;i<=24;i++){const x=-W+i*2*W/24,q=pproj(cam,x,y,bz(x,y));if(lp&&q)pline(g,lp[0],lp[1],q[0],q[1],net);lp=q;}}
 for(const sx of [-1,1]){for(let kk=0;kk<=4;kk++){const z=Z+(ZB-Z)*kk/4;const a=pproj(cam,sx*W,0,z),b=pproj(cam,sx*W,H,z);if(a&&b)pline(g,a[0],a[1],b[0],b[1],net);}
  for(let j=0;j<=10;j++){const y=H*j/10,a=pproj(cam,sx*W,y,Z),b=pproj(cam,sx*W,y,ZB);if(a&&b)pline(g,a[0],a[1],b[0],b[1],net);}}
 for(let i=0;i<=24;i+=2){const x=-W+i*2*W/24,a=pproj(cam,x,H,Z),b=pproj(cam,x,H,bz(x,H));if(a&&b)pline(g,a[0],a[1],b[0],b[1],net);}
 const post=(a,b,w)=>{if(!a||!b)return;segD(g,a,b,w,'#ffffff');segD(g,[a[0]+w*0.5,a[1]],[b[0]+w*0.5,b[1]],Math.max(0.5,w*0.35),'#c8c8c0');};
 const pl=pproj(cam,-W,0,Z),plt=pproj(cam,-W,H,Z),pr=pproj(cam,W,0,Z),prt=pproj(cam,W,H,Z);
 const w=pl?Math.max(1.5,0.06*pl[2]):2;
 if(pl&&pr){g.fillStyle='rgba(0,0,0,0.35)';const sp=pproj(cam,-W+0.5,0,Z+0.6),sp2=pproj(cam,W+0.5,0,Z+0.6);}
 post(pl,plt,w);post(pr,prt,w);post(plt,prt,w);
}
function penBall(g,cam,bp,spin,blur){
 const p=pproj(cam,bp.x,bp.y,bp.z);if(!p)return;
 const r=Math.max(1.6,PEN.BR*p[2]);
 const s=pproj(cam,bp.x,0,bp.z);if(s)ellipseF(g,s[0]+r*0.3,s[1],r*1.05,Math.max(1,r*0.32),'rgba(0,0,0,0.35)');
 if(blur&&blur.length)blur.forEach((q,i)=>{disc(g,q[0],q[1],Math.max(1,q[2]*0.8),`rgba(255,255,240,${0.12+i*0.06})`);});
 disc(g,p[0],p[1],r+1,'#1a1a1a');disc(g,p[0],p[1],r,'#e4e4dc');disc(g,p[0]-r*0.18,p[1]-r*0.18,r*0.8,'#fbfbf6');
 if(r>2.6){for(let i=0;i<5;i++){const a=spin+i*1.2566,dx=Math.cos(a)*r*0.58,vis=Math.sin(a);if(vis<-0.3)continue;disc(g,p[0]+dx,p[1]+(i%2?-1:1)*r*0.3*vis,Math.max(0.6,r*0.2),'#262626');}
  disc(g,p[0]-r*0.4,p[1]-r*0.45,Math.max(0.5,r*0.16),'#ffffff');}
 return[p[0],p[1],r];
}
function penKeeperPose(c,P,t){
 // pose del arquero según su estado (para la vista del pateador)
 const k=keeperState(c,P),res=c.result,after=c.phase==='after';
 let j,rot=0,lift=0,face=null,xOff=0;
 if(k.e>0.02){
  const st=poseStretch(),rd=poseKeeperReady(t);
  j=lerpPose(rd,after&&res==='save'&&c.t>0.35?poseHug():st,Math.min(1,k.e*1.3));
  const ang=k.side?(k.dy<0?1.62:k.dy>0?1.15:1.4):0;
  rot=k.side*ang*Math.min(1,k.e*1.25);
  lift=(k.dy>0?0.75:k.dy<0?0.1:0.42)*Math.sin(Math.min(1,k.e)*Math.PI*(after&&c.t>0.25?0.5:0.85));
  if(!k.side){j=k.dy>0?shiftY(lerpPose(rd,poseArmsUp(0),k.e),-k.e*2.5,false):lerpPose(rd,poseHug(),k.e*0.8);}
  if(after&&c.t>0.25&&k.side)lift=Math.max(0,lift*(1-(c.t-0.25)*3));
 }else{j=poseKeeperReady(t);xOff=c.hk?0:Math.sin(t*2.3)*0.28;}
 if(after&&c.t>1.0){if(res==='save'||res==='post'||res==='bar'||res==='over'||res==='wide'){j=poseArmsUp(t);rot=0;lift=0;face='happy';xOff=SIM.clamp(k.kx*0.5,-2.4,2.4)-k.kx;}else if(res==='goal'&&!k.side){j=poseSad(t);face='sad';}}
 return{j,rot,lift,face,x:k.side&&!(after&&c.t>1&&res!=='goal')?k.kx-k.side*0.55:SIM.clamp(k.kx+xOff,-3.3,3.3)};
}
function penShooterPose(c,P,t){
 const rp=c.phase==='ready'||c.phase==='aim'?0:c.phase==='run'?c.run:1;
 // carrera en curva con paso corto antes del remate
 const ang=Math.PI*0.35*(1-rp);
 const x=-0.55-Math.sin(ang)*2.4,z=-0.45-Math.cos(ang)*2.6*(1-rp)-0.0;
 let j,face=null,rot=0;
 if(c.phase==='flight'||(c.phase==='after'&&c.t<0.5)){const kt=c.phase==='flight'?Math.min(1,0.45+c.ft/0.35*0.55):1;j=poseKick(kt);}
 else if(c.phase==='after'){const goal=PEN.isGoal(c.result);j=goal?poseRun(t*11,'plane'):poseSad(t);face=goal?'happy':'sad';}
 else if(c.phase==='run'){j=poseRun(rp*18,null);}
 else j=poseStand(t);
 return{j,x:c.phase==='after'&&c.t>0.5&&PEN.isGoal(c.result)?x+Math.min(3,(c.t-0.5)*2.5):x,z:c.phase==='after'&&c.t>0.5&&PEN.isGoal(c.result)?z-Math.min(2,(c.t-0.5)*1.5):z,face};
}

/* ---- primera persona: piernas del pateador y guantes del arquero ---- */
/* ---- primera persona: sprites pixel art dibujados a mano (píxeles gordos, paleta corta) ---- */
// Guante derecho visto desde atrás (las palmas miran al pateador). '.' = transparente.
const SPR_GLOVE=[
 '....oo.oo.oo.oo.',
 '...owwowwowwowwo',
 '...owwowwowwowwo',
 '...owgowgowgowgo',
 '...owgowgowgowgo',
 '...owgowgowgowgo',
 '.ooowgowgowgowgo',
 'owwowwwwwwwwwwgo',
 'owwowwwwwwwwwwgo',
 'owgowwwwwwwwwwgo',
 'owgwwwwwwwwwwwgo',
 '.owwwwwwwwwwwwgo',
 '.owwwkkkkkkwwwgo',
 '.owwwwwwwwwwwwgo',
 '.owwwwwwwwwwwggo',
 '..owwwwwwwwwwggo',
 '..oooooooooooooo',
 '..occcccccccccco',
 '..ocssssssssssco',
 '..occcccccccccco',
 '..oCCCCCCCCCCCCo'
];
// Guante cerrado (atajando): dedos doblados hacia adentro
const SPR_GLOVE_FIST=[
 '...oooooooooooo.',
 '..owwowwowwowwo.',
 '..owgowgowgowgo.',
 '.oooggggggggggo.',
 'owwowwwwwwwwwwgo',
 'owgowwwwwwwwwwgo',
 'owgwwwwwwwwwwwgo',
 '.owwwkkkkkkwwwgo',
 '.owwwwwwwwwwwggo',
 '..owwwwwwwwwwggo',
 '..oooooooooooooo',
 '..occcccccccccco',
 '..ocssssssssssco',
 '..occcccccccccco',
 '..oCCCCCCCCCCCCo'
];
// Botín visto desde arriba (punta hacia adelante) con el comienzo de la media
const SPR_BOOT=[
 '...oooo...',
 '..obbbbo..',
 '.obbbbbbo.',
 '.obBbbbbo.',
 '.obBbbbbo.',
 '.obBwwbbo.',
 '.obBbbbbo.',
 '.obBwwbyo.',
 '.obBbbbyo.',
 '.obBwwyyo.',
 '.obBbbyyo.',
 '.obbbbbbo.',
 '.oooooooo.',
 '.osLssSSo.',
 '.osLssSSo.'
];
function drawPix(g,rows,pal,x,y,s,flip){
 const w=rows[0].length;x=Math.round(x/s)*s;y=Math.round(y/s)*s;
 for(let j=0;j<rows.length;j++){const r=rows[j];for(let i=0;i<w;i++){const ch=r[i];if(!ch||ch==='.')continue;const col=pal[ch];if(!col)continue;g.fillStyle=col;g.fillRect(x+(flip?w-1-i:i)*s,y+j*s,s,s);}}
 return{x,y,w:w*s,h:rows.length*s};
}
// columna pixelada (media o manga) desde un punto hasta el borde de abajo
function pixColumn(g,x,y,wCells,s,col,dark,light){
 x=Math.round(x/s)*s;y=Math.round(y/s)*s;const h=PH+s-y;if(h<=0)return;const w=wCells*s;
 g.fillStyle='#0c120f';g.fillRect(x-s,y,w+2*s,h);
 g.fillStyle=col;g.fillRect(x,y,w,h);
 g.fillStyle=light;g.fillRect(x+s,y,s,h);
 g.fillStyle=dark;g.fillRect(x+w-2*s,y,s*2,h);
}
function fpLegs(g,c,P,t){
 const kit=game.kits[c.team],S=5;
 const pal={o:'#0c120f',b:'#1b1b1d',B:'#3b3b40',w:'#f2f2ec',y:'#e8c22a',s:kit.socks,S:sh(kit.socks,-0.28),L:sh(kit.socks,0.3)};
 const kicking=c.phase==='flight'||c.phase==='after';const kp=kicking?Math.min(1,(c.phase==='flight'?c.ft:0.4)/0.18):0;
 // la carrera mueve las piernas de a "pasos" enteros de píxel
 const step=c.phase==='run'?Math.round(Math.sin(P.clock*16)*3):0;
 const bw=SPR_BOOT[0].length*S;
 // pierna de apoyo
 let lx=PW*0.38-bw/2,ly=PH-104+Math.max(0,step)*S;
 let b1=drawPix(g,SPR_BOOT,pal,lx,ly,S,false);
 pixColumn(g,b1.x+2*S,b1.y+b1.h,6,S,kit.socks,sh(kit.socks,-0.28),sh(kit.socks,0.3));
 // pierna que patea: corre, va atrás y sale al golpe
 let rx=PW*0.6-bw/2-kp*70,ry=(kicking?PH-104-Math.sin(kp*Math.PI*0.95)*90:PH-104+Math.max(0,-step)*S);
 const b2=drawPix(g,SPR_BOOT,pal,rx,ry,S,true);
 pixColumn(g,b2.x+2*S,b2.y+b2.h,6,S,kit.socks,sh(kit.socks,-0.28),sh(kit.socks,0.3));
}
function fpGloves(g,c,P,t,k){
 const gk=game.gkKits[c.kt],S=4;
 const pal={o:'#0c120f',w:'#f4f4ee',g:'#c4c4bb',k:sh(gk.p,-0.15),c:gk.p,C:sh(gk.p,-0.3),s:'#ffffff'};
 const caught=c.phase==='after'&&c.result==='save'&&c.t>0.05;const goal=c.phase==='after'&&PEN.isGoal(c.result);
 const ready=c.phase==='run'||c.phase==='flight'?1:0;
 const bob=Math.round(Math.sin(P.clock*4)*1.5)*S;
 const ex=k.side?-k.side*150*k.e:0,ey=-(k.dy>0?120:k.dy<0?-20:55)*k.e;
 const spr=caught?SPR_GLOVE_FIST:SPR_GLOVE,gw=spr[0].length*S;
 for(const s of [-1,1]){
  const cx=PW/2+s*(caught?40:96+ready*20)+ex+(k.side?-k.side*s*20*k.e:0);
  const top=PH-150+bob*(1-k.e)-ready*8+ey+(caught?-30:0)+(goal?70*Math.min(1,c.t):0);
  const gx=Math.round((cx-gw/2)/S)*S,gy=Math.round(top/S)*S;
  // manga del buzo (columna pixelada) alineada con el puño del guante
  pixColumn(g,gx+(s<0?1:3)*S,gy+(spr.length-1)*S,12,S,gk.p,sh(gk.p,-0.3),sh(gk.p,0.25));
  // mano derecha tal cual; la izquierda espejada
  drawPix(g,spr,pal,gx,gy,S,s<0);
 }
 if(caught){const S2=4,bx0=PW/2+ex-7*S2,by0=PH-150-30+ey-6*S2;
  const BALL=['...oooooo...','..owwwwwwo..','.owwbbwwwwo.','owwbbbbwwwwo','owwwbbwwwgwo','owwwwwwwbbgo','owgwwwwbbbgo','owggwwwwbggo','.oggggwwggo.','..ogggggo...','...oooooo...'];
  drawPix(g,BALL,{o:'#0c120f',w:'#f4f4ee',g:'#c4c4bb',b:'#262626'},bx0,by0,S2,false);}
}

/* ---- escena completa ---- */
function renderPens(dt,W,H){
 const P=game.pens,c=P.cur,g=pg,t=P.clock;
 if(!penScene)penScene=buildPenScene();
 g.imageSmoothingEnabled=false;
 const cheer=c&&c.phase==='after'?{team:PEN.isGoal(c.result)?P.T.indexOf(P.T[c.team]):c.kt}:(P.phase==='final'?{team:P.res[0].filter(Boolean).length>P.res[1].filter(Boolean).length?0:1}:null);
 let zoom=1;
 if(!c||c.cam==='shooter'){
  const run=c?c.run:0,kicking=c&&(c.phase==='flight'||c.phase==='after');
  const bob=c&&c.phase==='run'?Math.abs(Math.sin(t*16))*0.06:0;
  const cam=P.cam={x:0.15-run*0.15,y:1.55+bob-run*0.22,z:-2.7+run*1.55,dir:1,f:505,hy:150,cx:PW/2};
  if(kicking)zoom=1+Math.max(0,0.06-(c.phase==='flight'?Math.abs(c.ft-0.05):1)*0.3);
  drawSky(g,cam.hy);
  const by=pproj(cam,0,0.95,PEN.D+4.2),byb=pproj(cam,0,0,PEN.D+4.2);
  drawCrowd(g,0,by?by[1]:cam.hy-20,t,cheer);drawLights(g,t);
  drawPitch(g,cam,-3,PEN.D+4.2);
  const bl=pproj(cam,-16,0.95,PEN.D+4.2),br=pproj(cam,16,0,PEN.D+4.2);if(bl&&br)drawLED(g,Math.round(bl[0]),Math.round(bl[1]),Math.round(br[0]),Math.round(br[1]),t);
  const bp=c?ballPos(c):{x:0,y:PEN.BR,z:0};
  const inNet=c&&c.phase==='after'&&(c.result==='goal'||c.result==='over'||c.result==='wide');
  if(inNet)penBall(g,cam,bp,t*12,null);
  drawGoalHD(g,cam,c,P);
  if(c){const kp=penKeeperPose(c,P,t),pp=pproj(cam,kp.x,0,PEN.D+0.15);
   if(pp){const Hh=1.95*pp[2];ellipseF(g,pp[0],pp[1],Hh*0.16,Hh*0.03,'rgba(0,0,0,0.35)');
    bigPlayer(g,pp[0],pp[1],Hh,{j:kp.j,rot:kp.rot,lift:kp.lift*pp[2],kit:game.gkKits[c.kt],skin:SKIN[c.gk.skin|0],hair:c.gk.hair||'#222',gk:true,num:c.gk.num,face:kp.face});}}
  if(!inNet){if(c){c.blur=c.blur||[];const q=penBall(g,cam,bp,c.shot?t*22:0,c.phase==='flight'?c.blur:null);if(c.phase==='flight'&&q){c.blur.push(q);if(c.blur.length>4)c.blur.shift();}else c.blur=[];}else penBall(g,cam,bp,0,null);}
  if(c&&c.reticle&&(c.phase==='aim'||c.phase==='run')){
   const sw=PEN.sway(c.shooter,t,c.charge),q=pproj(cam,c.aim.x+sw.x,c.aim.y+sw.y,PEN.D);
   if(q){const col=c.charge>0.86?'#ff3b30':c.charge>=0.76?'#7dff4f':'#ffe14d';const rr=6+Math.sin(t*8);
    for(let a=0;a<16;a++){const an=a/16*Math.PI*2;g.fillStyle=col;g.fillRect(Math.round(q[0]+Math.cos(an)*rr),Math.round(q[1]+Math.sin(an)*rr),1,1);}
    g.fillStyle=col;g.fillRect(Math.round(q[0])-1,Math.round(q[1]),3,1);g.fillRect(Math.round(q[0]),Math.round(q[1])-1,1,3);
    const a0=pproj(cam,c.aim.x,c.aim.y,PEN.D);if(a0){g.fillStyle='rgba(255,255,255,0.5)';g.fillRect(Math.round(a0[0]),Math.round(a0[1]),1,1);}}
  }
  if(c&&c.hs)fpLegs(g,c,P,t);
  if(c&&c.hs&&c.phase==='run'){const bw=150,x0=PW/2-bw/2,y0=PH-14;g.fillStyle='#000';g.fillRect(x0-2,y0-2,bw+4,9);
   const seg=(a,b,col)=>{g.fillStyle=col;g.fillRect(x0+Math.round(a*bw),y0,Math.max(1,Math.round((b-a)*bw)),5);};
   seg(0,0.76,'#3a3a32');seg(0.76,0.86,'#1f5a2a');seg(0.86,1,'#5a1f1f');const ch=Math.min(1,c.charge);
   seg(0,Math.min(ch,0.76),'#e8e24a');if(ch>0.76)seg(0.76,Math.min(ch,0.86),'#7dff4f');if(ch>0.86)seg(0.86,ch,'#ff3b30');}
  P.roll=0;
 }else{
  const k=keeperState(c,P);
  const camY=1.62+(k.side?(k.dy>0?0.55:k.dy<0?-1.05:-0.5)*k.e:(k.dy>0?0.55*k.e:k.dy<0?-0.8*k.e:0));
  const cam=P.cam={x:k.kx,y:Math.max(0.32,camY),z:PEN.D+0.3,dir:-1,f:445,hy:160,cx:PW/2};
  drawSky(g,cam.hy);
  const by=pproj(cam,0,0.95,-9),bl=pproj(cam,18,0.95,-9),br=pproj(cam,-18,0,-9);
  drawCrowd(g,0,by?by[1]:cam.hy-18,t,cheer);drawLights(g,t);
  drawPitch(g,cam,-9,PEN.D+0.3);
  if(bl&&br)drawLED(g,Math.round(Math.min(bl[0],br[0])),Math.round(bl[1]),Math.round(Math.max(bl[0],br[0])),Math.round(br[1]),t);
  const sp=penShooterPose(c,P,t),sq=pproj(cam,sp.x,0,sp.z);
  const bp=ballPos(c);
  const ballFirst=bp.z<sp.z;
  if(ballFirst&&!(c.phase==='after'&&PEN.isGoal(c.result)))penBall(g,cam,bp,t*20,null);
  if(sq){const Hh=1.85*sq[2];ellipseF(g,sq[0],sq[1],Hh*0.15,Hh*0.03,'rgba(0,0,0,0.35)');
   bigPlayer(g,sq[0],sq[1],Hh,{j:sp.j,kit:game.kits[c.team],skin:SKIN[c.shooter.skin|0],hair:c.shooter.hair,num:c.shooter.num,face:sp.face});}
  const caught=c.phase==='after'&&c.result==='save';
  if(!ballFirst&&!caught&&!(c.phase==='after'&&PEN.isGoal(c.result)&&bp.z>PEN.D)){c.blur=c.blur||[];const q=penBall(g,cam,bp,t*24,c.phase==='flight'?c.blur:null);if(c.phase==='flight'&&q){c.blur.push(q);if(c.blur.length>4)c.blur.shift();}}
  // líneas de velocidad al tirarse
  if(k.side&&k.e>0.1&&k.e<0.95){g.fillStyle='rgba(255,255,255,0.22)';for(let i=0;i<14;i++){const y=(i*37+Math.floor(t*60)*13)%PH;g.fillRect(k.side>0?0:PW-120,y,120*(1-k.e),1);}}
  fpGloves(g,c,P,t,k);
  P.roll=k.side?-k.side*0.3*k.e:0;
 }
 // papelitos y destello
 for(let i=fx.confetti.length-1;i>=0;i--){const q=fx.confetti[i];q.t+=dt;q.vy+=40*dt;q.x+=q.vx*dt+Math.sin(q.t*7+i)*0.4;q.y+=q.vy*dt;if(q.t>q.ttl){fx.confetti.splice(i,1);continue;}g.fillStyle=q.col;g.fillRect(Math.round(q.x),Math.round(q.y),2,(i%3)?1:2);}
 if(P.flash>0){g.fillStyle=`rgba(255,250,230,${P.flash})`;g.fillRect(0,0,PW,PH);P.flash=Math.max(0,P.flash-dt*2.2);}
 // viñeta
 const vg=g.createRadialGradient(PW/2,PH/2,PH*0.45,PW/2,PH/2,PW*0.65);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,0.35)');g.fillStyle=vg;g.fillRect(0,0,PW,PH);
 // componer en pantalla
 const sc=Math.min(W/PW,H/PH);let ox=Math.round((W-PW*sc)/2),oy=Math.round((H-PH*sc)/2);
 if(fx.shake>0){fx.shake=Math.max(0,fx.shake-dt);ox+=Math.round((Math.random()-0.5)*fx.shake*14*sc);oy+=Math.round((Math.random()-0.5)*fx.shake*14*sc);}
 sctx.imageSmoothingEnabled=false;
 const roll=c&&c.cam==='keeper'?(P.roll||0):0;
 if(roll||zoom!==1){sctx.save();sctx.translate(W/2,H/2);sctx.rotate(roll);const z=(roll?1.4:1)*zoom;sctx.drawImage(pbuf,-PW*sc*z/2,-PH*sc*z/2,PW*sc*z,PH*sc*z);sctx.restore();}
 else sctx.drawImage(pbuf,ox,oy,Math.round(PW*sc),Math.round(PH*sc));
 P.xf={sc,ox,oy};
 penOverlay(dt,W,H,sc,ox,oy);
 if(mouseOn()){const mx0=Math.round(mouse.x),my0=Math.round(mouse.y),u=Math.max(2,Math.round(sc));
  sctx.fillStyle='rgba(0,0,0,.7)';sctx.fillRect(mx0-5*u,my0-u,10*u+u,3*u);sctx.fillRect(mx0-u,my0-5*u,3*u,10*u+u);
  sctx.fillStyle='#3fd8ff';sctx.fillRect(mx0-5*u,my0,4*u,u);sctx.fillRect(mx0+2*u,my0,4*u,u);sctx.fillRect(mx0,my0-5*u,u,4*u);sctx.fillRect(mx0,my0+2*u,u,4*u);}
}
function spawnConfettiPens(kit){for(let i=0;i<260;i++)fx.confetti.push({x:Math.random()*PW,y:Math.random()*120,vx:(Math.random()-0.5)*40,vy:-(10+Math.random()*50),col:Math.random()<0.5?kit.p:kit.s,t:0,ttl:2.4+Math.random()*1.8});}
function penOverlay(dt,W,H,sc,ox,oy){
 const P=game.pens,c=P.cur;
 const fs=Math.max(16,Math.round(5.6*sc)),top=Math.round(oy+8*sc);
 sctx.font=`${fs}px Silkscreen, monospace`;sctx.textBaseline='middle';
 const n=Math.max(5,P.res[0].length,P.res[1].length),r0=Math.round(fs*0.3),gap=Math.round(r0*2.8),inner=fs*1.8,span=(n-1)*gap+r0;
 const dots=(team,x,dir)=>{for(let i=0;i<n;i++){const v=P.res[team][i];const cx=x+dir*(r0+i*gap);sctx.beginPath();sctx.arc(cx,top+fs*0.5,r0,0,Math.PI*2);
   if(v===true){sctx.fillStyle='#7dff4f';sctx.fill();}else if(v===false){sctx.fillStyle='#ff3b30';sctx.fill();}else{sctx.strokeStyle='#93ad9f';sctx.lineWidth=2;sctx.stroke();}}};
 const half=inner+span+fs*3.4;
 sctx.fillStyle='rgba(5,11,8,0.82)';sctx.fillRect(W/2-half,top-fs*0.3,half*2,fs*1.6);
 sctx.fillStyle='#f3f0e2';sctx.textAlign='right';sctx.fillText(P.T[0].abbr,W/2-inner-span-fs*0.6,top+fs*0.55);sctx.textAlign='left';sctx.fillText(P.T[1].abbr,W/2+inner+span+fs*0.6,top+fs*0.55);
 dots(0,W/2-inner,-1);dots(1,W/2+inner,1);
 sctx.textAlign='center';sctx.fillStyle='#ffb02e';
 const a=P.res[0].filter(Boolean).length,b=P.res[1].filter(Boolean).length;sctx.fillText(`${a}-${b}`,W/2,top+fs*0.55);
 sctx.font=`${Math.round(fs*0.95)}px VT323, monospace`;sctx.fillStyle='#f3f0e2';
 if(c&&P.phase!=='final'&&P.phase!=='intro'){
  sctx.fillText(`Patea ${c.shooter.n} (${P.T[c.team].abbr}) · ataja ${c.gk.n}`,W/2,top+fs*2.1);
  let help='';
  const mv=sl=>sl===1&&mouseOn()?'el mouse':sl===1&&touch.on?'el joystick':sl===1?'WASD':'las flechas',kb=sl=>sl===1&&mouseOn()?'el click':sl===1&&touch.on?'PATEAR':sl===1?'Espacio':'Enter';
  if(c.hs&&(c.phase==='aim'||c.phase==='run'))help=c.reticle?'Apuntá con '+mv(c.hs)+' · mantené '+kb(c.hs)+' para correr y cargar, soltá para patear':'Apuntá a ciegas con '+mv(c.hs)+' (empieza al medio) · mantené y soltá '+kb(c.hs);
  else if(c.hk&&!c.dive&&c.phase!=='after')help='Elegí lado con '+mv(c.hk)+' y tocá '+kb(c.hk)+' para tirarte · si te tirás antes de la patada, te ven';
  if(help){const hy2=oy+PH*sc-fs*1.1;const tw=sctx.measureText(help).width;sctx.fillStyle='rgba(5,11,8,0.8)';sctx.fillRect(W/2-tw/2-10,hy2-fs*0.6,tw+20,fs*1.2);sctx.fillStyle='#d8e6dc';sctx.fillText(help,W/2,hy2);}
 }
 const m=P.msg||(P.phase==='intro'?{text:'PENALES',col:'#ffb02e',t:0,sub:'Se patean 5 cada uno · después, muerte súbita'}:null);
 if(m){m.t+=dt;const big=Math.round(fs*3.4*(m.t<0.15?0.5+m.t/0.15*0.5:m.t<0.25?1.1-(m.t-0.15):1));sctx.font=`${big}px Silkscreen, monospace`;sctx.textAlign='center';
  sctx.fillStyle='#000';sctx.fillText(m.text,W/2+4,H*0.4+4);sctx.fillStyle=m.col;sctx.fillText(m.text,W/2,H*0.4);
  if(m.sub){sctx.font=`${Math.round(fs*1.15)}px VT323, monospace`;sctx.fillStyle='#000';sctx.fillText(m.sub,W/2+2,H*0.4+big*0.8+2);sctx.fillStyle='#f3f0e2';sctx.fillText(m.sub,W/2,H*0.4+big*0.8);}}
}

/* ===================== AUDIO ===================== */
let AC=null,muted=false;
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();}catch(e){AC=null;}}return AC;}
function tone(f0,f1,dur,type,vol){const a=ac();if(!a||muted)return;const t=a.currentTime,o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+dur);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);o.connect(g).connect(a.destination);o.start(t);o.stop(t+dur+0.02);}
function noise(dur,vol,freq){const a=ac();if(!a||muted)return;const n=Math.floor(a.sampleRate*dur),bb=a.createBuffer(1,n,a.sampleRate),d=bb.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);const src=a.createBufferSource();src.buffer=bb;const fl=a.createBiquadFilter();fl.type='bandpass';fl.frequency.value=freq;const g=a.createGain();g.gain.value=vol;src.connect(fl).connect(g).connect(a.destination);src.start();}
function sfx_fut(e){
 if(e.t==='steal'){tone(320,160,0.07,'square',0.07);return;}
 if(game&&game.demo)return;
 switch(e.t){
  case'kick':tone(170,55,0.09,'sine',Math.min(0.5,0.12+e.power/50));noise(0.04,0.15,900);break;
  case'touch':if(e.v>2)tone(140,70,0.05,'sine',Math.min(0.25,e.v/30));break;
  case'dtouch':tone(240,170,0.035,'triangle',0.035);break;
  case'wall':if(e.v>2)noise(0.07,Math.min(0.3,e.v/40),420);break;
  case'post':tone(980,700,0.25,'square',0.08);tone(1470,1100,0.2,'triangle',0.05);break;
  case'net':noise(0.18,Math.min(0.35,0.08+(e.v||8)/50),1400);tone(160,90,0.12,'triangle',0.05);break;
  case'sidenet':noise(0.1,0.1,1600);break;
  case'roofnet':noise(0.1,0.08,1800);break;
  case'catch':tone(220,120,0.08,'triangle',0.2);break;
  case'dive':noise(0.12,0.12,600);break;
  case'whistle':tone(2100,2050,0.18,'triangle',0.09);break;
  case'skill':noise(0.14,0.14,1900);tone(600,900,0.1,'triangle',0.05);break;
  case'feint':tone(300,200,0.12,'square',0.04);break;
  case'goal':noise(1.6,0.35,700);tone(523,523,0.14,'square',0.07);setTimeout(()=>tone(659,659,0.14,'square',0.07),140);setTimeout(()=>tone(784,784,0.3,'square',0.07),280);break;
  case'end':tone(2100,2050,0.2,'triangle',0.09);setTimeout(()=>tone(2100,2050,0.2,'triangle',0.09),260);setTimeout(()=>tone(2100,1900,0.5,'triangle',0.09),520);break;
 }
}

/* ===================== UI / PARTIDA ===================== */
const $=id=>document.getElementById(id);
const LS='triple-setup-v1';
let setup={format:1,duration:180,cap:0,equal:false,diff:'normal',replays:true,mode:'amistoso',tourType:'nba',tsel:{team:'lal',player:0,kit:'auto',ctrl:'P1'},sides:[{team:'lal',player:0,ctrl:'P1'},{team:'bos',player:0,ctrl:'CPU'}]};
try{const sv=JSON.parse(localStorage.getItem(LS)||'null');if(sv&&sv.sides)setup=Object.assign(setup,sv);}catch(e){}
// la v2.0 (modo clásico) guardaba formatos de 5 a 11: se vuelve al picadito
if(![1,2,3].includes(setup.format)){setup.format=2;setup.duration=180;setup.cap=5;}delete setup.play;
// configuraciones viejas guardaban el equipo por posición en la lista
const OLD_IDS=['arg','bra','fra','esp','eng','lriv','lboc'];
for(const sd of setup.sides){if(!TEAMS.some(t=>t.id===sd.team))sd.team='lal';if(sd.player<0)sd.player=0;}
if(!TEAMS.some(t=>t.id===(setup.tsel&&setup.tsel.team)))setup.tsel={team:'lal',player:0,kit:'auto',ctrl:'P1'};
if(![0,11,21].includes(setup.cap))setup.cap=0;setup.tie='golden';
function save(){try{localStorage.setItem(LS,JSON.stringify(setup));}catch(e){}}
let fontsReady=0;
if(document.fonts&&document.fonts.load){Promise.all([document.fonts.load('8px Silkscreen'),document.fonts.load('16px VT323')]).then(()=>{fontsReady=1;}).catch(()=>{});}

function colorDist(a,b){const pa=parseInt(a.slice(1),16),pb=parseInt(b.slice(1),16);return Math.hypot((pa>>16)-(pb>>16),((pa>>8)&255)-((pb>>8)&255),(pa&255)-(pb&255));}
// Camisetas: cada lado puede pedir 'home' (titular), 'away' (suplente) o 'auto'.
// En 'auto' el equipo cambia a la suplente si choca de color con el rival.
function resolveKits(tA,tB,cA,cB){
 cA=cA||'auto';cB=cB||'auto';
 const pick=(t,c)=>c==='away'?t.alt:t.kit,other=(t,k)=>k===t.kit?t.alt:t.kit;
 let kA=pick(tA,cA),kB=pick(tB,cB);
 const clash=()=>kA===kB||colorDist(kA.p,kB.p)<110;
 if(clash()){if(cB==='auto')kB=other(tB,kB);else if(cA==='auto')kA=other(tA,kA);}
 if(clash()&&cA==='auto'&&cB==='auto')kA=other(tA,kA);
 return[kA,kB];
}
function gkKit(t){return{p:t.gk.kit,s:t.gk.kit,pat:'solid',sleeve:t.gk.kit,shorts:'#1b1b1b',socks:t.gk.kit,num:'#111111'};}

let game=null,acc=0,last=performance.now();
function buildGame(cfg,demo,net){
 const lineups=[],ctrls=[];
 cfg.sides.forEach((sd,team)=>{
  const t=teamOf(sd.team);const n=cfg.format;
  const pick=sd.player>=0?sd.player:0;
  const picks=net?net.humans.filter(x=>x.team===team&&!x.gk).map(x=>x.k):[pick];
  const order=[...picks,...t.players.map((_,i)=>i).filter(i=>!picks.includes(i))];
  const lu=[];
  for(let i=0;i<n;i++)lu.push({data:(cfg.cp&&team===0&&i===0)?cfg.cp:t.players[order[i%order.length]]});
  lu.push({data:t.gk,gk:true});
  lineups.push(lu);
 });
 const tie=cfg.tie||'golden';
 const wth=net||demo?(SPORT.kind==='futbol'?'dia':'normal'):pickWeather(cfg);
 const state=SIM.createMatch({weather:wth,format:cfg.format,duration:cfg.duration,cap:cfg.cap,equal:cfg.equal,lineups,freeKicks:cfg.fouls!==false,styles:[teamStyle(cfg.sides[0].team),teamStyle(cfg.sides[1].team)],kickoffTeam:0,allowDraw:cfg.allowDraw||(!cfg.tour&&tie==='draw'),penalties:cfg.penalties||(!cfg.tour&&tie==='pens'),agg:cfg.agg});
 state.players.forEach(p=>{
  const sd=cfg.sides[p.team];const t=teamOf(sd.team);
  const d=p.role==='gk'?t.gk:(cfg.cp&&p.team===0&&p.name===cfg.cp.n?cfg.cp:(t.players.find(x=>x.n===p.name)||t.players[0]));p.skin=d.skin;p.hair=d.hair;
  const firstField=state.players.find(q=>q.team===p.team&&q.role!=='gk');
  const gkSel=sd.player===-1&&cfg.format>=2;
  const nh=net&&net.humans.find(x=>x.team===p.team&&(p.role==='gk'?x.gk:(!x.gk&&x.name===p.name)));
  if(net){if(nh){ctrls[p.id]={type:'human',slot:nh.peer===NET.me?1:2,peer:nh.peer};if(p.role==='gk')p.hgk=true;}else ctrls[p.id]={type:'ai',diff:'normal'};}
  else if(!demo&&sd.ctrl!=='CPU'&&(gkSel?p.role==='gk':p===firstField)){ctrls[p.id]={type:'human',slot:sd.ctrl==='P1'?1:2};if(p.role==='gk')p.hgk=true;}
  else ctrls[p.id]={type:'ai',diff:sd.ctrl==='CPU'?cfg.diff:'normal'};
 });
 const tA=teamOf(cfg.sides[0].team),tB=teamOf(cfg.sides[1].team);
 return{weather:wth,stadium:stadiumOf(teamOf(cfg.sides[0].team)),state,ctrls,demo,paused:false,rec:[],replay:null,replayDone:false,lastInputs:[],stats:{shots:[0,0],onTarget:[0,0],saves:[0,0],poss:[0,0],tackles:[0,0],fouls:[0,0]},kits:resolveKits(tA,tB,cfg.sides[0].kit,cfg.sides[1].kit),gkKits:[gkKit(tA),gkKit(tB)],teams:[tA,tB],cfg:JSON.parse(JSON.stringify(cfg)),bannerT:0};
}
function startDemo(){
 const ai=Math.floor(Math.random()*TEAMS.length),bi=(ai+1+Math.floor(Math.random()*(TEAMS.length-1)))%TEAMS.length;const a=TEAMS[ai].id,b=TEAMS[bi].id;
 game=buildGame({format:2,duration:9999,cap:0,equal:false,diff:'normal',sides:[{team:a,player:0,ctrl:'CPU'},{team:b,player:0,ctrl:'CPU'}]},true);
 $('hud').hidden=true;$('hint').hidden=true;
}
function startMatch(cfg,tm,net){
 ac();if(AC&&AC.state==='suspended')AC.resume();
 if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();
 cfg=cfg||setup;
 if(!net)save();
 game=buildGame(cfg,false,net);game.net=net||null;game.netMenu=false;game.tourMatch=tm||null;acc=0;resetFX();$('banner').hidden=true;
 const ag=game.state.agg;$('agg').hidden=!(tm&&cfg.agg);$('agg').textContent=cfg.agg?`IDA ${ag[0]}-${ag[1]}`:'';
 if(tm)setTimeout(()=>{if(game&&game.tourMatch)banner(TOURS[tour.type].name.toUpperCase(),tm.stage+' · '+game.stadium.n,2.1);},150);
 showScreen(null);$('hud').hidden=false;$('hint').hidden=false;
 const[kA,kB]=game.kits;$('abbrA').textContent=game.teams[0].abbr;$('abbrB').textContent=game.teams[1].abbr;
 drawBadge($('chipA'),kA);drawBadge($('chipB'),kB);
 const ST=game.stadium;$('hudStadium').textContent=ST.n+(ST.c?' · '+ST.c.toUpperCase():'');$('hud').classList.remove('flash');
 resetParty();resetNets();
 if(!tm)setTimeout(()=>{if(game&&!game.demo&&!game.tourMatch&&game.state.tick<200)banner(ST.n,(ST.c?ST.c+' · ':'')+game.teams[0].name+' vs '+game.teams[1].name,2.1);},120);
 $('hint').textContent=hintText();
 updateHUD();
 showIntro();
}
// escudito pixelado con el diseño de la camiseta
function drawBadge(cv,kit){
 const g=cv.getContext('2d');g.clearRect(0,0,12,14);
 for(let y=0;y<14;y++){const inset=y<9?0:y<11?1:y<12?2:y<13?3:4;for(let x=inset;x<12-inset;x++){const edge=x===inset||x===11-inset||y===0||y===13-(y>=13?0:99);g.fillStyle=edge?'#000':patColor(kit,Math.min(7,Math.floor((x-1)*8/10)),Math.min(6,Math.floor((y-1)*7/11)));g.fillRect(x,y,1,1);}}
 g.fillStyle='rgba(255,255,255,.35)';g.fillRect(2,1,1,6);
}
function hudGoal(team){const hd=$('hud');hd.style.setProperty('--fc',game.kits[team].p);hd.classList.remove('flash');void hd.offsetWidth;hd.classList.add('flash');}
function hintText_fut(){
 if(touch.on&&setup.sides.some(sd=>sd.ctrl==='P1'))return'Joystick para moverte · PATEAR: mantené para cargar · FILI + dirección: filigrana';
 const h=[];setup.sides.forEach(sd=>{const gk=sd.player===-1&&setup.format>=2;if(sd.ctrl==='P1')h.push(gk?(mouseOn()||(setup.mouse!==false&&!touch.on)?'P1 arquero: WASD moverte · atajás solo dentro del área · click: estirada hacia la mira · con la pelota, click saca hacia la mira (mantené = más fuerte) · click der. de volea':'P1 arquero: WASD · Espacio sacar/patear · E agarrar (en el área) · Q estirada'):(mouseOn()?'P1: WASD · mouse apuntar · click patear · click der. globo':'P1: WASD · Espacio patear · E globo')+' · F pase (mantenido: presionar) · Q barrida · R filigrana · Shift'+(setup.swap&&setup.swap!=='no'?' · C cambio':''));if(sd.ctrl==='P2')h.push(gk?'P2 arquero: Flechas · Enter sacar · Shift der agarrar · Ctrl der estirada':'P2: Flechas · Enter patear · Ñ pase · Shift der · Ctrl der'+(setup.swap&&setup.swap!=='no'?' · coma cambio':''));});
 h.push('Esc pausa · M sonido');return h.join('   |   ');
}
// Cambio de jugador: con botón pasás al compañero más cerca de la pelota; en automático pasa solo cuando otro está claramente más cerca

// Pase a un compañero de la CPU: si jugás solo en tu equipo (o con la CPU), pasás a manejar al que la recibe
function passSwitch_fut(s){
 if(setup.passSwitch===false)return;
 for(const e of s.events){
  if(e.t==='kick'&&e.id!=null&&!e.shot&&!e.header){const c=game.ctrls[e.id],p=s.players[e.id];if(c&&c.type==='human'&&!c.peer&&p&&p.role!=='gk')game.passSw={from:e.id,team:p.team,k:s.tick};}
 }
 const P=game.passSw;if(!P)return;
 if(s.tick-P.k>240||s.phase==='goal'){game.passSw=null;return;}
 const lt=s.ball.lastTouch;if(lt<0||lt===P.from)return;
 game.passSw=null;
 const q=s.players[lt],p=s.players[P.from];
 if(!q||!p||q.team!==P.team||q.role==='gk')return;
 const cq=game.ctrls[q.id],cp=game.ctrls[P.from];
 if(!cq||cq.type!=='ai'||!cp||cp.type!=='human')return;
 game.ctrls[q.id]=cp;game.ctrls[P.from]={type:'ai',diff:'normal'};p.charging=false;
 popup('▼',q.x,q.y,cp.slot===1?'#3fd8ff':'#ff5aa8');
}
function doSwaps(s,inputs){
 const b=s.ball,sw=game.swapPrev||(game.swapPrev={}),cd=game.swapCd||(game.swapCd={});
 for(const p of s.players){const c=game.ctrls[p.id];if(!c||c.type!=='human'||p.role==='gk'||c.peer)continue;
  const slot=c.slot,inp=inputs[p.id]||{};if(cd[slot]>0)cd[slot]-=SIM.DT;
  const mates=s.players.filter(q=>q.team===p.team&&q!==p&&q.role!=='gk'&&game.ctrls[q.id].type!=='human');if(!mates.length)continue;
  const fx=b.x+b.vx*0.3,fy=b.y+b.vy*0.3,dist=q=>Math.hypot(q.x-fx,q.y-fy);
  let q=mates[0];for(const m of mates)if(dist(m)<dist(q))q=m;
  const pressed=!!inp.swap&&!sw[slot];sw[slot]=!!inp.swap;
  let go=false;
  if(setup.swap==='btn'&&pressed)go=true;
  if(setup.swap==='auto'&&!(cd[slot]>0)&&Math.hypot(b.x-p.x,b.y-p.y)>2.2&&dist(q)+1.8<dist(p)&&!p.charging)go=true;
  if(go){game.ctrls[q.id]=c;game.ctrls[p.id]={type:'ai',diff:'normal'};p.charging=false;inputs[q.id]=inp;inputs[p.id]=AI.field(s,p,'normal');cd[slot]=0.7;popup('▼',q.x,q.y,slot===1?'#3fd8ff':'#ff5aa8');}
 }
}
function showScreen(id){for(const k of ['menu','pause','end','tour'])$(k).hidden=k!==id;
 const can=!!(game&&game.lastGoal&&!game.net&&!game.demo);for(const b of ['btnGif','btnGif2'])$(b).hidden=!can;for(const el of document.querySelectorAll('.gif-note'))el.textContent='';}
function togglePause(fromBlur){
 if(!game||game.demo||(game.state.phase==='end'&&!game.pens))return;
 $('btnRestart').hidden=!!game.net;
 if(game.net){game.netMenu=!game.netMenu;showScreen(game.netMenu?'pause':null);keys.clear();tapped.clear();$('pauseNote').hidden=true;if(game.netMenu)$('btnResume').focus();return;}
 game.paused=!game.paused;showScreen(game.paused?'pause':null);keys.clear();tapped.clear();
 $('pauseNote').hidden=!(game.paused&&fromBlur===true);
 if(game.paused){if(fromBlur!==true)$('btnResume').focus();}
 else{if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();try{window.focus();}catch(e){}}
}
function fmt(t){t=Math.max(0,Math.ceil(t));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0');}
function updateHUD_fut(){
 const s=game.state;$('scoreA').textContent=s.score[0];$('scoreB').textContent=s.score[1];
 const ck=$('clock');if(s.golden){ck.textContent='ORO '+fmt(s.ot);ck.classList.add('gold');}else{ck.textContent=fmt(s.clock);ck.classList.remove('gold');}
}
function banner(big,small,dur){$('bannerBig').textContent=big;$('bannerSmall').textContent=small||'';$('banner').hidden=false;game.bannerT=dur;}
function handleEvents_fut(){
 const s=game.state,st=game.stats;
 const isMe=id=>{const c=game.ctrls[id];return!!c&&c.type==='human'&&(game.net?c.peer===NET.me:c.slot===1);};
 const vib=pat=>{if(setup.vib===false||!touch.on||!navigator.vibrate)return;try{navigator.vibrate(pat);}catch(_){}};
 const PS=game.ps||(game.ps={}),ps=id=>PS[id]||(PS[id]={g:0,a:0,sv:0,sh:0,tk:0}),TL=game.tl||(game.tl=[]);
 for(const e of s.events){
  sfx(e);
  if(game.demo)continue;
  if((e.t==='kick'||e.t==='steal')&&isMe(e.id))vib(e.t==='steal'?25:e.pass?8:14);
  else if(e.t==='trip'&&isMe(e.id))vib(40);
  else if(e.t==='catch'&&isMe(e.id))vib(25);
  else if(e.t==='goal'){const me=s.players.find(q=>isMe(q.id));if(me&&me.team===e.team)vib([60,40,120]);}
  if((e.t==='kick'||e.t==='touch'||e.t==='catch')&&e.id!=null&&s.players[e.id]){const last=TL[TL.length-1];if(!last||last.id!==e.id)TL.push({id:e.id,team:s.players[e.id].team,k:s.tick});if(TL.length>40)TL.shift();}
  if(e.t==='goal'){const sc=s.ball.lastTouch;game.lastScorerId=sc;
   if(sc>=0&&s.players[sc]&&!e.own){ps(sc).g++;
    for(let i=TL.length-1;i>=0;i--){const q=TL[i];if(q.id===sc)continue;if(q.team===s.players[sc].team&&s.tick-q.k<60*8)ps(q.id).a++;break;}}
   TL.length=0;}
  if(e.t==='catch'&&e.v>6&&e.id!=null)ps(e.id).sv++;
  if(e.t==='touch'&&e.gk&&e.v>8&&e.id!=null)ps(e.id).sv++;
  if(e.t==='tackle'&&e.id!=null)ps(e.id).tk++;
  switch(e.t){
   case'goal':{const tn=game.teams[e.team].abbr;banner('¡GOOOL!',e.own?`${e.name} (en contra) · ${tn}`:`${e.name} · ${tn}`,setup.replays&&!game.net?0.9:2.3);fx.shake=0.5;fx.flash=0.6;spawnConfetti(game.kits[e.team]);crowdEvent('goal',e.team);hudGoal(e.team);
    game.goalCaption=e.own?`${e.name} (en contra)`:e.name;break;}
   case'golden':banner('GOL DE ORO','El próximo gol gana',2);break;
   case'whistle':if(s.tick<5)crowdEvent('kickoff');if(s.phase==='kickoff'&&s.players.some(q=>q.team===s.kickoffTeam&&game.ctrls[q.id].type==='human')&&!s.pendingEnd)setTimeout(()=>{if(game&&!game.demo&&game.state.phase==='kickoff')banner('SAQUE','Tocá la pelota para empezar',1.3);},game.state.tick<5?2400:2600);break;
   case'kick':{if(e.power>16)crowdEvent('chance');
    if(e.power>13)for(let i=0;i<5;i++)fx.dust.push({x:e.x,y:e.y,vx:Math.cos(i*1.26)*2.4,vy:Math.sin(i*1.26)*2.4,t:0});
    if(e.perfect&&e.power>14)popup('¡PERFECTO!',e.x,e.y,'#7dff4f');
    if(e.header){const atk=e.team===0?1:-1;if(e.vx*atk>4)popup('¡CABEZAZO!',e.x,e.y,'#9be7ff');}
    if(!e.lob&&e.power>12){
     const atk=e.team===0?1:-1,gx=atk*s.L/2;
     if(e.vx*atk>0){const t=(gx-e.x)/e.vx;const y=e.y+e.vy*t;if(t>0&&t<2.2&&Math.abs(y)<s.G/2+1.5){st.shots[e.team]++;if(e.id!=null)ps(e.id).sh++;if(Math.abs(y)<s.G/2)st.onTarget[e.team]++;}}
    }
    break;}
   case'skill':{const nm={flick:'¡SOMBRERITO!',roulette:'¡RULETA!',stepover:'¡BICICLETA!',chilena:'¡CHILENA!'}[e.type];popup(nm,e.x,e.y,'#ffe14d');break;}
   case'feint':{const q=s.players[e.id];popup('¡LO DEJÓ PAGANDO!',q.x,q.y,'#9be7ff');break;}
   case'post':crowdEvent('chance');popup('¡PALO!',s.ball.x,s.ball.y,'#f3f0e2');fx.shake=Math.max(fx.shake,0.25);break;
   case'catch':if(e.v>6){crowdEvent('save');st.saves[e.team]++;popup('¡ATAJADA!',s.ball.x,s.ball.y,'#ffb02e');}break;
   case'touch':if(e.gk&&e.v>8){crowdEvent('save');st.saves[e.team]++;popup('¡QUÉ ATAJADA!',s.ball.x,s.ball.y,'#ffb02e');}break;
   case'tackle':st.tackles[s.players[e.id].team]++;break;
   case'trip':popup('¡BARRIDA!',s.players[e.id].x,s.players[e.id].y,'#9be7ff');break;
   case'steal':popup('¡QUITE!',e.x,e.y,'#9be7ff');if(s.players[e.id])st.tackles[s.players[e.id].team]++;ps(e.id).tk++;break;
   case'freekick':banner(e.pen?'¡PENAL!':'TIRO LIBRE',game.teams[e.team].name,1.6);crowdEvent('chance');break;
   case'foul':st.fouls[s.players[e.id].team]++;popup('¡FALTA!',e.x,e.y,'#ff5a4f');break;
   case'wall':if(e.v>16)fx.shake=Math.max(fx.shake,0.12);break;
   case'net':case'sidenet':case'roofnet':netHit(e);break;
   case'dtouch':for(let i=0;i<3;i++)fx.dust.push({x:e.x,y:e.y,vx:(i-1)*0.9,vy:-0.4+i*0.3,t:0});if(fx.dust.length>30)fx.dust.splice(0,fx.dust.length-30);break;
  }
 }
 s.events.length=0;
 if(!game.demo&&s.phase==='play'&&s.ball.lastTeam>=0)st.poss[s.ball.lastTeam]++;
}
function showEnd_fut(){
 const s=game.state;
 const pr=game.pensResult;
 let w=s.score[0]+s.agg[0]===s.score[1]+s.agg[1]?null:s.score[0]+s.agg[0]>s.score[1]+s.agg[1]?0:1;
 if(s.score[0]===s.score[1]&&!(s.agg[0]||s.agg[1]))w=null;
 if(pr)w=pr[0]>pr[1]?0:1;
 $('endTitle').textContent=w==null?'EMPATE':'GANÓ '+game.teams[w].abbr;
 $('endA').textContent=game.teams[0].abbr;$('endB').textContent=game.teams[1].abbr;$('endScore').textContent=s.score[0]+' - '+s.score[1]+(pr?` (${pr[0]}-${pr[1]} pen)`:'');
 const L=s.scorers.filter(x=>x.team===0),R=s.scorers.filter(x=>x.team===1),rows=Math.max(L.length,R.length);
 const fmtS=x=>x?`${x.name}${x.own?' (ec)':''} ${x.golden?'oro':fmt(x.t)}`:'';
 let html='';for(let i=0;i<rows;i++){html+=`<div>${fmtS(L[i])}</div><div>${fmtS(R[i])}</div>`;}
 $('endScorers').innerHTML=html;
 const st=game.stats,tp=st.poss[0]+st.poss[1]||1,pa=Math.round(st.poss[0]/tp*100);
 const row=(l,a,b2)=>`<tr><td>${a}</td><th>${l}</th><td>${b2}</td></tr>`;
 {const PS=game.ps||{},rows=[];const won=w==null?-1:w;
  for(const id in PS){const p=s.players[id];if(!p)continue;const q=PS[id];const sc=q.g*3+q.a*2+q.sv*1.2+q.tk*0.6+q.sh*0.3+(p.team===won?1:0);if(q.g+q.a+q.sv+q.sh+q.tk)rows.push({p,q,sc});}
  rows.sort((a,b)=>b.sc-a.sc);
  const fig=rows[0];const fe=$('endFig');fe.hidden=!fig;
  if(fig)fe.innerHTML=`★ FIGURA DEL PARTIDO ★<br><b>${escH(fig.p.name)}</b> · ${escH(game.teams[fig.p.team].abbr)}`;
  const hum=id=>game.ctrls[id]&&game.ctrls[id].type==='human';
  $('endPlayers').innerHTML=rows.length?`<tr><th>Jugador</th><td>G</td><td>A</td><td>Atj</td><td>Tiros</td></tr>`+rows.slice(0,8).map(r=>`<tr class="${hum(r.p.id)?'me':''}"><th>${escH(r.p.name)} <span style="color:var(--muted)">${escH(game.teams[r.p.team].abbr)}</span></th><td>${r.q.g}</td><td>${r.q.a}</td><td>${r.q.sv}</td><td>${r.q.sh}</td></tr>`).join(''):'';}
 $('endStats').innerHTML=row('Tiros (al arco)',`${st.shots[0]} (${st.onTarget[0]})`,`${st.shots[1]} (${st.onTarget[1]})`)+row('Posesión',pa+'%',(100-pa)+'%')+row('Atajadas',st.saves[0],st.saves[1])+row('Barridas limpias',st.tackles[0],st.tackles[1])+row('Faltas',st.fouls[0],st.fouls[1]);
 const tm=game.tourMatch;
 if(tm&&tour){recordUserResult(tour,tm,s.score,pr);
  const ag=s.agg,glob=ag[0]||ag[1]?` · global ${s.score[0]+ag[0]}-${s.score[1]+ag[1]}`:'';
  $('endTitle').textContent=(w==null?'EMPATE':w===0?'¡GANASTE!':'PERDISTE')+(pr?' POR PENALES':glob.toUpperCase());}
 $('btnRematch').textContent=tm?'Continuar torneo':game.net?(NET.host?'Revancha':'Esperando revancha…'):'Revancha';$('btnRematch').disabled=!!(game.net&&!NET.host);$('btnEndMenu').textContent=game.net?'Volver a la sala':'Volver al menú';
 $('endCareer').hidden=true;try{careerAfterMatch();profAfterMatch();}catch(e){console.error(e);}
 showScreen('end');$('btnRematch').focus();
}

function padKick(){const pads=getPads();for(const g of pads)if(g&&g.buttons[0]&&g.buttons[0].pressed)return true;return false;}
// Ciclo del juego. Usa siempre performance.now() (no el tiempo que pasa el navegador a requestAnimationFrame,
// que en algunos entornos viene en otra base y dejaba el reloj negativo = partido congelado).
let lastFrameAt=0;
function frame(){
 requestAnimationFrame(frame);
 tickOnce();
}
function tickOnce(){
 lastFrameAt=performance.now();
 try{frameBody(lastFrameAt);}catch(e){showError(e);}
}
// Respaldo: si el navegador deja de llamar a requestAnimationFrame (pasa en algunas vistas embebidas),
// el juego sigue avanzando con un temporizador.
setInterval(()=>{if(performance.now()-lastFrameAt>120)tickOnce();},16);
function showError(e){
 if(showError.shown)return;showError.shown=true;
 console.error('Error en el juego:',e);
 const box=document.createElement('div');
 box.style.cssText='position:absolute;left:12px;right:12px;bottom:44px;z-index:50;background:#3a0d0d;color:#ffd7d0;border:2px solid #ff5a4f;padding:8px 12px;font:18px VT323,monospace;white-space:pre-wrap;max-height:30%;overflow:auto';
 box.textContent='Error (mandale esto a Claude): '+(e&&e.stack?e.stack.split('\n').slice(0,3).join(' | '):String(e));
 document.getElementById('app').appendChild(box);
}
addEventListener('error',ev=>showError(ev.error||ev.message));
function frameBody(t){
 updateTouchUI();
 if(game&&game.exporting){last=t;return;}
 let dt=(t-last)/1000;last=t;
 if(!(dt>0))dt=0;if(dt>0.1)dt=0.1;
 updateCrowdAudio(dt,!!(game&&!game.demo&&!game.paused&&$('end').hidden&&$('menu').hidden&&$('tour').hidden));
 if(!(acc>=0))acc=0;
 if(game&&game.pens){if(!game.paused)penUpdate(dt);render(game.paused?0:dt);return;}
 if(introTick(dt)){render(0);return;}
 if(game&&game.replay&&!game.paused){
  const r=game.replay;r.t+=dt*60*0.6;r.age+=dt;
  const skip=r.age>0.4&&(keys.has('Space')||keys.has('Enter')||keys.has('NumpadEnter')||padKick()||!!touch.held.kick);
  if(r.t>=r.frames.length-1||skip){game.replay=null;fx.trail.length=0;if(skip){keys.delete('Space');keys.delete('Enter');keys.delete('NumpadEnter');}}
 }else if(game&&game.net&&!game.net.host){netClient(dt);
 }else if(game&&!game.paused&&game.state.phase!=='end'){
  acc+=dt;let n=0;
  while(acc>=SIM.DT&&n<6){
   const s=game.state;
   const inputs=s.players.map(p=>{const c=game.ctrls[p.id];if(c.type==='human')return c.peer&&c.peer!==NET.me?netInput(c.peer):game.netMenu?NEUT():readHuman(c.slot);return p.role==='gk'?AI.keeper(s,p,c.diff):AI.field(s,p,c.diff);});
   if(!game.net&&!game.demo&&(setup.swap==='btn'||setup.swap==='auto'))doSwaps(s,inputs);
   game.lastInputs=inputs;
   SIM.step(s,inputs);if(game.net)netCollect(s.events);if(!game.net&&!game.demo)passSwitch(s);handleEvents();acc-=SIM.DT;n++;
   if(!game.demo){game.rec.push(snap(s));if(game.rec.length>260)game.rec.shift();}
   if(s.phase==='kickoff')game.replayDone=false;
   if(!game.demo&&!game.net&&s.phase==='goal'&&s.phaseT>=0.9&&!game.replayDone&&!game.noReplay){
    game.replayDone=true;game.lastGoal={frames:game.rec.slice(-200),caption:game.goalCaption||'',side:s.lastGoalTeam===0?1:-1};
    if(setup.replays){game.replay={frames:game.lastGoal.frames,t:0,age:0,caption:game.lastGoal.caption,side:game.lastGoal.side};$('banner').hidden=true;acc=0;break;}
   }
   if(s.phase==='end'){if(game.demo){startDemo();}else if(s.needPens){const g0=game;setTimeout(()=>{if(game===g0&&!game.pens&&!game.pensResult)startPens();},900);}else{setTimeout(showEnd,600);}break;}
  }
  if(acc>SIM.DT*6)acc=0;
 }
 if(game&&game.net&&game.net.host&&NET.sala)netHostPublish();
 if(game&&!game.demo){$('hint').hidden=!!game.replay;if(game.state.phase==='play'&&$('bannerBig').textContent==='SAQUE'&&!$('banner').hidden){$('banner').hidden=true;game.bannerT=0;}updateHUD();if(game.bannerT>0){game.bannerT-=dt;if(game.bannerT<=0)$('banner').hidden=true;}}
 document.body.classList.toggle('aiming',!!(game&&!game.demo&&mouseOn()&&$('menu').hidden&&$('pause').hidden&&$('end').hidden));
 render(dt);
}

/* ===================== TORNEOS =====================
   Formatos adaptados a partidos cortos (8 equipos cada uno):
   · Mundial: 2 grupos de 4 (todos contra todos) → semifinales → final.
   · Champions: fase liga (3 partidos por equipo, tabla única) → semis (1°-4°, 2°-3°) → final.
   · Libertadores: 2 grupos de 4 → semifinales ida y vuelta (si el global empata, penales) → final única.
   En las eliminatorias, si hay empate se define por penales.
   Los partidos entre equipos de la CPU se juegan de verdad con el mismo motor, sin pantalla y en tiempo acelerado. */
const TOURS={
 este:{name:'Conferencia Este',cats:['este'],desc:'8 equipos del Este · 2 grupos de 4 · semifinales cruzadas · final',groups:true},
 oeste:{name:'Conferencia Oeste',cats:['oeste'],desc:'8 equipos del Oeste · 2 grupos de 4 · semifinales cruzadas · final',groups:true},
 nba:{name:'Finales NBA',cats:['este','oeste'],desc:'8 equipos de las dos conferencias · fase liga: 3 partidos cada uno · semifinales (1° vs 4°, 2° vs 3°) · final',groups:false}
};
if(!TOURS[setup.tourType])setup.tourType='nba';
const TOUR_LS='triple-tour-v1';
let tour=null;
try{tour=JSON.parse(localStorage.getItem(TOUR_LS)||'null');if(tour&&!TOURS[tour.type])tour=null;}catch(e){tour=null;}
function saveTour(){try{if(tour)localStorage.setItem(TOUR_LS,JSON.stringify(tour));else localStorage.removeItem(TOUR_LS);}catch(e){}}
function rng(seed){let x=(seed>>>0)||1;return()=>((x=(Math.imul(x,1664525)+1013904223)>>>0)/4294967296);}
function shuffle(a,r){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const mk=(a,b,o)=>Object.assign({a,b,res:null},o||{});

function newTour(type,userId,kit,player){
 const T=TOURS[type],seed=(Date.now()%2147483647)|0,r=rng(seed);
 const pool=TEAMS.filter(t=>T.cats.includes(t.cat)&&t.id!==userId).map(t=>t.id);
 let others;
 if(type==='lib'){
  const uArg=teamOf(userId).cat==='arg';
  const arg=shuffle(pool.filter(id=>teamOf(id).cat==='arg'),r),sud=shuffle(pool.filter(id=>teamOf(id).cat==='sud'),r);
  others=[...arg.slice(0,uArg?3:4),...sud.slice(0,uArg?4:3)];
 }else others=shuffle(pool,r).slice(0,7);
 const teams=shuffle([userId,...others],r);
 const t={type,seed,user:userId,kit:kit||'auto',player:player||0,teams,rounds:[],ri:0,champion:null,out:null};
 if(T.groups){
  t.groups=[teams.slice(0,4),teams.slice(4,8)];
  const P=[[0,1,2,3],[0,2,1,3],[0,3,1,2]];
  for(let k=0;k<3;k++){const ms=[];for(const g of t.groups){const p=P[k];ms.push(mk(g[p[0]],g[p[1]],{draw:true}),mk(g[p[2]],g[p[3]],{draw:true}));}
   t.rounds.push({name:'Fase de grupos · Fecha '+(k+1)+' de 3',stage:'group',matches:ms});}
 }else{
  const arr=teams.slice();
  for(let k=0;k<3;k++){const ms=[];for(let i=0;i<4;i++)ms.push(mk(arr[i],arr[7-i],{draw:true}));
   t.rounds.push({name:'Fase liga · Fecha '+(k+1)+' de 3',stage:'group',matches:ms});arr.splice(1,0,arr.pop());}
 }
 return t;
}
function standings(t,ids){
 const row={};for(const id of ids)row[id]={id,pj:0,g:0,e:0,p:0,gf:0,gc:0,pts:0};
 for(const rd of t.rounds){if(rd.stage!=='group')continue;for(const m of rd.matches){
  if(!m.res||!row[m.a]||!row[m.b])continue;const[x,y]=m.res,A=row[m.a],B=row[m.b];
  A.pj++;B.pj++;A.gf+=x;A.gc+=y;B.gf+=y;B.gc+=x;
  if(x>y){A.g++;B.p++;A.pts+=3;}else if(x<y){B.g++;A.p++;B.pts+=3;}else{A.e++;B.e++;A.pts++;B.pts++;}
 }}
 return Object.values(row).sort((a,b)=>b.pts-a.pts||(b.gf-b.gc)-(a.gf-a.gc)||b.gf-a.gf||t.teams.indexOf(a.id)-t.teams.indexOf(b.id));
}
// global de una serie de ida y vuelta, visto desde el local de la vuelta
function aggFor(t,m){
 if(!m.leg2)return null;const ida=t.rounds[m.idaRound].matches[m.idaIdx];
 return ida.res?[ida.res[1],ida.res[0]]:[0,0];
}
function winnerOf(t,m){
 if(!m.res)return null;
 let a=m.res[0],b=m.res[1];
 if(m.leg2){const g=aggFor(t,m);a+=g[0];b+=g[1];}
 if(a===b&&m.pens)return m.pens[0]>m.pens[1]?m.a:m.b;
 return a>b?m.a:m.b;
}
// Avanza el torneo cuando la fecha actual está completa: arma semifinales, final o corona al campeón.
function advanceTour(t){
 const rd=t.rounds[t.ri];if(!rd||rd.matches.some(m=>!m.res))return false;
 const T=TOURS[t.type];
 if(t.ri<t.rounds.length-1){t.ri++;return true;}
 if(rd.stage==='group'){
  let pairs;
  if(T.groups){const A=standings(t,t.groups[0]),B=standings(t,t.groups[1]);pairs=[[A[0].id,B[1].id],[B[0].id,A[1].id]];}
  else{const S=standings(t,t.teams);pairs=[[S[0].id,S[3].id],[S[1].id,S[2].id]];}
  const q=pairs.flat();if(!q.includes(t.user)&&!t.out)t.out=T.groups?'en la fase de grupos':'en la fase liga';
  if(T.twoLegs){
   const ida=t.rounds.length;
   t.rounds.push({name:'Semifinal · Ida',stage:'semi1',matches:pairs.map(([hi,lo])=>mk(lo,hi,{draw:true}))});
   t.rounds.push({name:'Semifinal · Vuelta',stage:'semi2',matches:pairs.map(([hi,lo],i)=>mk(hi,lo,{leg2:true,idaRound:ida,idaIdx:i}))});
  }else t.rounds.push({name:'Semifinales',stage:'semi',matches:pairs.map(([a,b])=>mk(a,b))});
 }else if(rd.stage==='semi'||rd.stage==='semi2'){
  const fin=rd.matches.map(m=>winnerOf(t,m));
  if(!fin.includes(t.user)&&!t.out)t.out='en semifinales';
  t.rounds.push({name:'Final',stage:'final',matches:[mk(fin[0],fin[1])]});
 }else if(rd.stage==='final'){
  t.champion=winnerOf(t,rd.matches[0]);
  if(t.champion!==t.user&&!t.out)t.out='en la final';
  return false;
 }
 t.ri++;return true;
}
function userMatch(t){const rd=t.rounds[t.ri];if(!rd||t.champion)return null;const i=rd.matches.findIndex(m=>m.a===t.user||m.b===t.user);return i<0?null:{m:rd.matches[i],i};}
function teamRating(t){const top=t.players.map(p=>p.st.reduce((a,b)=>a+b,0)/5).sort((a,b)=>b-a).slice(0,3);return top.reduce((a,b)=>a+b,0)/top.length;}
// Partido CPU vs CPU con el motor real: sin pantalla, 1 vs 1, 90 segundos de juego.
function simMatch_fut(t,m,k){
 const r=rng(t.seed+k*7919);
 const lu=id=>{const tm=teamOf(id),off=Math.floor(r()*tm.players.length);return[{data:tm.players[off%tm.players.length]},{data:tm.gk,gk:true}];};
 const g=m.leg2?aggFor(t,m):null;
 const s=SIM.createMatch({format:1,duration:90,cap:0,equal:false,lineups:[lu(m.a),lu(m.b)],kickoffTeam:r()<0.5?0:1,allowDraw:!!m.draw,penalties:!m.draw,agg:g||[0,0]});
 const diff=id=>{const v=teamRating(teamOf(id));return v>=84?'hard':v>=80?'normal':'easy';};
 const dA=diff(m.a),dB=diff(m.b);
 let n=0;
 while(s.phase!=='end'&&n<60*210){
  const inp=s.players.map(p=>p.role==='gk'?AI.keeper(s,p,'normal'):AI.field(s,p,p.team?dB:dA));
  SIM.step(s,inp);s.events.length=0;n++;
 }
 // empate en eliminatoria: tanda de penales con la misma mecánica que jugás vos
 if(s.needPens)m.pens=PEN.autoShootout(teamOf(m.a),teamOf(m.b),r);
 return[s.score[0],s.score[1]];
}
// Juega todo lo pendiente que no sea del usuario y avanza hasta el próximo partido suyo (o el final).
function progressTour(t){
 let guard=0;
 while(!t.champion&&guard++<20){
  const rd=t.rounds[t.ri];
  rd.matches.forEach((m,i)=>{if(!m.res&&(m.a!==t.user&&m.b!==t.user||t.out))m.res=simMatch(t,m,t.ri*10+i);});
  if(rd.matches.some(m=>!m.res))break;
  if(!advanceTour(t))break;
 }
 saveTour();
}
function recordUserResult(t,tm,score,pens){
 const m=t.rounds[tm.ri].matches[tm.mi];if(m.res)return;
 m.res=tm.swapped?[score[1],score[0]]:[score[0],score[1]];
 if(pens)m.pens=tm.swapped?[pens[1],pens[0]]:[pens[0],pens[1]];
 saveTour();
}

/* ---------- pantalla del torneo ---------- */
function chip(id,kit){const t=teamOf(id);const k=kit||t.kit;return`<span class="tchip" style="background:${k.p};border-color:${k.s===k.p?k.shorts:k.s}"></span>`;}
function tname(id,cls){const t=teamOf(id);return`<span class="${id===tour.user?'me ':''}${cls||''}">${t.name}</span>`;}
function resTxt(m){if(!m.res)return'<span class="vs">vs</span>';return`<b>${m.res[0]} - ${m.res[1]}${m.pens?` <small>(pen ${m.pens[0]}-${m.pens[1]})</small>`:''}</b>`;}
function tableHTML(rows,title,qual){
 return`<div class="ttable">${title?`<p class="label">${title}</p>`:''}<table><thead><tr><th></th><th class="l">Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>DG</th><th>Pts</th></tr></thead><tbody>${rows.map((r,i)=>`<tr class="${i<qual?'q':''}${r.id===tour.user?' meRow':''}"><td>${i+1}</td><td class="l">${chip(r.id)}${teamOf(r.id).name}</td><td>${r.pj}</td><td>${r.g}</td><td>${r.e}</td><td>${r.p}</td><td>${r.gf-r.gc>0?'+':''}${r.gf-r.gc}</td><td><b>${r.pts}</b></td></tr>`).join('')}</tbody></table></div>`;
}
let abandonArmed=false;
function showTour(){
 if(!tour){showScreen('menu');renderMenu();return;}
 if(!game||!game.demo)startDemo();
 progressTour(tour);
 const T=TOURS[tour.type],u=userMatch(tour);
 $('tourTitle').textContent=T.name.toUpperCase();
 const rd=tour.rounds[tour.ri];
 $('tourStage').textContent=tour.champion?'Torneo terminado':(rd?rd.name:'');
 // próximo partido / campeón / eliminado
 let next='';
 if(tour.champion){
  const me=tour.champion===tour.user;
  next=`<p class="label">${me?'¡Lo ganaste!':'Campeón'}</p><div class="champ">${chip(tour.champion)}<span>${teamOf(tour.champion).name}</span></div>
   <p class="small-note">${me?`¡${T.name} para ${teamOf(tour.user).name}!`:`Quedaste afuera ${tour.out}.`}</p>
   <button class="play" id="btnTourNew">NUEVO TORNEO</button>`;
 }else if(u){
  const m=u.m,rival=m.a===tour.user?m.b:m.a,g=m.leg2?aggFor(tour,m):null;
  const gTxt=g?`<p class="small-note">Global de la ida: ${teamOf(m.a).abbr} ${g[0]} - ${g[1]} ${teamOf(m.b).abbr}. Si el global empata, penales.</p>`:'';
  const rule='Si empatan, canasta de oro.';
  next=`<p class="label">Tu próximo partido · ${rd.name}</p>
   <div class="nextm"><div>${chip(m.a)}${tname(m.a)}</div><span class="vs">vs</span><div>${chip(m.b)}${tname(m.b)}</div></div>
   ${gTxt}<p class="small-note">${rule}</p>
   <p class="label">Tu camiseta</p><div class="seg" id="tourKit"></div>
   <button class="play" id="btnTourPlay">JUGAR PARTIDO</button>
   <div class="row2"><button class="btn" id="btnTourSim">Simular mi partido</button><button class="btn" id="btnTourQuit">${abandonArmed?'¿Seguro? Tocá de nuevo':'Abandonar torneo'}</button></div>`;
 }else{
  next=`<p class="label">Quedaste afuera ${tour.out||''}</p><p class="small-note">Podés ver cómo termina el torneo.</p>
   <button class="play" id="btnTourRest">SIMULAR HASTA EL FINAL</button><button class="btn" id="btnTourNew2">Nuevo torneo</button>`;
 }
 $('tourNext').innerHTML=next;
 // tablas
 let tables='';
 if(TOURS[tour.type].groups)tables=tableHTML(standings(tour,tour.groups[0]),'Grupo A',2)+tableHTML(standings(tour,tour.groups[1]),'Grupo B',2);
 else tables=tableHTML(standings(tour,tour.teams),'Tabla de la fase liga',4);
 $('tourTables').innerHTML=tables;
 // fixture: eliminatorias y resultados por fecha
 let fx='';
 for(let i=tour.rounds.length-1;i>=0;i--){
  const r=tour.rounds[i];if(i>tour.ri&&!tour.champion)continue;
  fx+=`<div class="fround"><p class="label">${r.name}</p>${r.matches.map(m=>{const g=m.leg2&&m.res?aggFor(tour,m):null;
   return`<div class="fm${m.a===tour.user||m.b===tour.user?' meRow':''}"><span class="l">${tname(m.a)}${chip(m.a)}</span>${resTxt(m)}<span class="r">${chip(m.b)}${tname(m.b)}</span>${g?`<em>global ${m.res[0]+g[0]}-${m.res[1]+g[1]}</em>`:''}</div>`;}).join('')}</div>`;
 }
 $('tourFixture').innerHTML=fx;
 showScreen('tour');
 const on=(id,f)=>{const el=$(id);if(el)el.onclick=f;};
 if($('tourKit'))seg($('tourKit'),[['auto','Auto'],['home','Titular'],['away','Suplente']],()=>tour.kit,v=>{tour.kit=v;saveTour();showTour();});
 on('btnTourPlay',()=>{abandonArmed=false;startTourMatch();});
 on('btnTourSim',()=>{abandonArmed=false;const m=userMatch(tour);if(m){m.m.res=simMatch(tour,m.m,tour.ri*10+m.i);saveTour();}showTour();});
 on('btnTourQuit',()=>{if(!abandonArmed){abandonArmed=true;showTour();return;}abandonArmed=false;tour=null;saveTour();showScreen('menu');renderMenu();});
 on('btnTourRest',()=>{progressTour(tour);showTour();});
 const toMenuNew=()=>{tour=null;saveTour();setup.mode='torneo';showScreen('menu');renderMenu();};
 on('btnTourNew',toMenuNew);on('btnTourNew2',toMenuNew);
 if(tour.champion&&tour.champion===tour.user&&!tour.celebrated){tour.celebrated=true;saveTour();if(game){fx.confetti.length=0;spawnConfetti(teamOf(tour.user).kit);}}
}
function startTourMatch(){
 const u=userMatch(tour);if(!u)return;
 const m=u.m,swapped=m.b===tour.user,rival=swapped?m.a:m.b;
 let agg=m.leg2?aggFor(tour,m):null;if(agg&&swapped)agg=[agg[1],agg[0]];
 const cfg={format:setup.format,duration:setup.duration,cap:setup.cap,equal:setup.equal,diff:setup.diff,replays:setup.replays,
  sides:[{team:tour.user,player:tour.player||0,ctrl:'P1',kit:tour.kit},{team:rival,player:0,ctrl:'CPU',kit:'auto'}],
  allowDraw:!!m.draw,penalties:!m.draw,tour:true,agg:agg||null};
 startMatch(cfg,{ri:tour.ri,mi:u.i,swapped,stage:tour.rounds[tour.ri].name});
}

/* ---------- menú ---------- */
function seg(el,opts,get,set,cls){
 el.innerHTML='';
 for(const[v,label]of opts){const b=document.createElement('button');b.type='button';b.textContent=label;if(cls)b.className=cls(v);b.setAttribute('aria-pressed',String(get()===v));b.onclick=()=>{set(v);save();renderMenu();};el.appendChild(b);}
}
function sideCard(i){
 const el=$('side'+i),tmode=setup.mode==='torneo';
 if(tmode&&i===1){tourInfo(el);return;}
 const sd=tmode?setup.tsel:setup.sides[i];
 const cats=tmode?CATS.filter(c=>TOURS[setup.tourType].cats.includes(c.id)):CATS;
 if(!cats.some(c=>c.id===teamOf(sd.team).cat)){sd.team=TEAMS.find(x=>x.cat===cats[0].id).id;sd.player=0;}
 const t=teamOf(sd.team);
 const inCat=TEAMS.filter(x=>x.cat===t.cat),ci=inCat.indexOf(t);
 if(sd.player>=t.players.length||(sd.player===-1&&setup.format<2&&!tmode))sd.player=0;
 const isGK=sd.player===-1,pl=isGK?Object.assign({},t.gk,{st:null}):t.players[sd.player];
 const nOpt=t.players.length,optIdx=isGK?t.players.length:sd.player;
 const other=tmode?sd:setup.sides[1-i];
 const kit=tmode?(sd.kit==='away'?t.alt:t.kit):(i===0?resolveKits(t,teamOf(other.team),sd.kit,other.kit):resolveKits(teamOf(other.team),t,other.kit,sd.kit))[i];
 const names=['VEL','TIR','TRI','DEF','REB'];
 el.innerHTML=`
  <div class="side-head"><span class="side-name">${tmode?'TU EQUIPO':i===0?'LOCAL':'VISITANTE'}</span><div class="seg" id="ctrl${i}"></div></div>
  <select class="cat" id="cat${i}" aria-label="Categoría">${cats.map(c=>`<option value="${c.id}"${c.id===t.cat?' selected':''}>${c.name} (${TEAMS.filter(x=>x.cat===c.id).length})</option>`).join('')}</select>
  <div class="picker"><button type="button" id="tp${i}" aria-label="Equipo anterior">◀</button><div class="val" id="tn${i}">${t.name}<span class="count">${ci+1}/${inCat.length}</span></div><button type="button" id="tn2${i}" aria-label="Equipo siguiente">▶</button></div>
  <div class="kit-stage"><canvas id="kit${i}" width="64" height="36"></canvas></div>
  ${i===0||tmode?`<p class="small-note stadium-note">Local en ${stadiumOf(t).n.split(' ').map(w=>w.charAt(0)+w.slice(1).toLowerCase()).join(' ')}</p>`:''}
  <div class="seg kitsel" id="kitsel${i}"></div>
  <p class="label">${!tmode&&sd.ctrl==='CPU'?'Capitán (CPU)':'Tu jugador'}</p>
  <div class="picker"><button type="button" id="pp${i}" aria-label="Jugador anterior">◀</button><div class="val">${isGK?'🧤 ':''}${pl.n} <span style="color:var(--muted)">#${pl.num}${isGK?' · arquero':''}</span></div><button type="button" id="pn${i}" aria-label="Jugador siguiente">▶</button></div>
  <div class="stats">${isGK?[['REF',pl.refl],['ALC',pl.reach]].map(([k,v])=>`<span>${k}</span><span class="bar"><i style="width:${(v-40)/60*100}%"></i></span><span class="n">${setup.equal?80:v}</span>`).join(''):pl.st.map((v,j)=>`<span>${names[j]}</span><span class="bar"><i style="width:${(v-40)/60*100}%"></i></span><span class="n">${setup.equal?78:v}</span>`).join('')}</div>
  ${isGK?'<p class="small-note">Atajás vos. Con mouse: dentro del área la agarrás solo, y con click te estirás hacia la mira; con la pelota en la mano, click la saca hacia la mira. Con teclado: E agarra (solo en el área) y Q es la estirada.</p>':''}`;
 if(tmode)$('ctrl'+i).innerHTML='<span class="small-note">Jugás con P1</span>';else seg($('ctrl'+i),[['P1','P1'],['P2','P2'],['CPU','CPU']],()=>sd.ctrl,v=>{if(v!=='CPU'&&other.ctrl===v)other.ctrl=v==='P1'?'P2':'P1';sd.ctrl=v;},v=>v==='P1'?'p1':v==='P2'?'p2':'');
 const mod=(a,n)=>(a%n+n)%n;
 seg($('kitsel'+i),[['auto','Auto'],['home','Titular'],['away','Suplente']],()=>sd.kit||'auto',v=>sd.kit=v);
 $('cat'+i).onchange=e=>{sd.team=TEAMS.find(x=>x.cat===e.target.value).id;sd.player=0;save();renderMenu();$('cat'+i).focus();};
 $('tp'+i).onclick=()=>{sd.team=inCat[mod(ci-1,inCat.length)].id;sd.player=0;save();renderMenu();};
 $('tn2'+i).onclick=()=>{sd.team=inCat[mod(ci+1,inCat.length)].id;sd.player=0;save();renderMenu();};
 const setOpt=k=>{sd.player=k===t.players.length?-1:k;save();renderMenu();};
 $('pp'+i).onclick=()=>setOpt(mod(optIdx-1,nOpt));
 $('pn'+i).onclick=()=>setOpt(mod(optIdx+1,nOpt));
 const kc=$('kit'+i).getContext('2d');kc.clearRect(0,0,64,36);
 const base={kit:bkit(kit,pl),skin:SKIN[pl.skin|0],hair:pl.hair,phase:0,moving:false,num:pl.num,gk:isGK,name:pl.n};
 drawFootballer(kc,14,33,Object.assign({view:'front'},base));
 drawFootballer(kc,32,33,Object.assign({view:'back'},base));
 drawFootballer(kc,50,33,Object.assign({view:'side',flip:false},base));
}
function tourInfo(el){
 const T=TOURS[setup.tourType];
 el.innerHTML=`<div class="tour-info"><p class="side-name">${T.name.toUpperCase()}</p><p class="big">Formato</p><p>${T.desc}.</p>
  <p class="big">Cómo se juega</p><p>Vos jugás tus partidos con P1 y la CPU juega el resto con el mismo motor del juego, así que los resultados salen de partidos de verdad. Si un partido termina empatado, se define con canasta de oro.</p>
  <p class="big">Rivales</p><p>Se sortean entre ${CATS.filter(c=>T.cats.includes(c.id)).map(c=>c.name).join(', ')}.</p></div>`;
}
function renderMenu(){
 seg($('optMode'),[['amistoso','AMISTOSO'],['torneo','TORNEO'],['carrera','CARRERA'],['online','ONLINE']],()=>setup.mode,v=>{if(v==='online'&&setup.mode!=='online'&&!NET.sala){NET.nameOk=false;NET.draft=null;$('online').dataset.view='';}setup.mode=v;});
 const onl=setup.mode==='online',car=setup.mode==='carrera';$('online').hidden=!onl;$('career').hidden=!car;$('mgrid').hidden=onl||car;$('helpBox').hidden=onl||car;
 if(car)renderCareer();
 if(onl){netInit();renderOnline();}
 const tm=setup.mode==='torneo';
 $('tourPick').hidden=!tm;
 seg($('optTour'),[['este','Conf. Este'],['oeste','Conf. Oeste'],['nba','Finales NBA']],()=>setup.tourType,v=>setup.tourType=v);
 $('btnPlay').textContent=tm?(tour&&!tour.champion?'NUEVO TORNEO':'EMPEZAR TORNEO'):'JUGAR';
 const cont=$('btnContTour');cont.hidden=!tour;
 if(tour){cont.textContent=(tour.champion?'VER ':'CONTINUAR ')+TOURS[tour.type].name.toUpperCase();cont.onclick=()=>showTour();}
 $('tiePick').hidden=true;
 seg($('optTie'),[['golden','Gol de oro'],['pens','Penales'],['draw','Empate']],()=>setup.tie||'golden',v=>setup.tie=v);
 seg($('optFormat'),[[1,'1 vs 1'],[2,'2 vs 2'],[3,'3 vs 3']],()=>setup.format,v=>setup.format=v);
 seg($('optDur'),[[120,'2 min'],[180,'3 min'],[240,'4 min'],[300,'5 min']],()=>setup.duration,v=>setup.duration=v);
 seg($('optCap'),[[11,'11 puntos'],[21,'21 puntos'],[0,'sin límite']],()=>setup.cap,v=>setup.cap=v);
 seg($('optStats'),[[false,'Reales (normalizadas)'],[true,'Todos iguales']],()=>setup.equal,v=>setup.equal=v);
 seg($('optReplay'),[[true,'Sí, en cámara lenta'],[false,'No']],()=>setup.replays,v=>setup.replays=v);
 seg($('optFouls'),[[true,'Sí'],[false,'No']],()=>setup.fouls!==false,v=>setup.fouls=v);
 $('mousePick').hidden=!!touch.on;seg($('optMouse'),[[true,'Sí'],[false,'No (solo teclado)']],()=>setup.mouse!==false,v=>{setup.mouse=v;if(!v)mouse.seen=false;});
 $('wxLabel').textContent=SPORT.wxLabel||'Clima';seg($('optWx'),SPORT.wxOpts||[['auto','Al azar'],['dia','Día'],['noche','Noche'],['lluvia','Lluvia'],['nieve','Nieve']],()=>setup.weather||'auto',v=>setup.weather=v);
 seg($('optPassSw'),[[true,'Sí'],[false,'No']],()=>setup.passSwitch!==false,v=>setup.passSwitch=v);
 seg($('optSwap'),[['no','No'],['btn','Con botón'],['auto','Automático']],()=>setup.swap||'no',v=>setup.swap=v);
 seg($('optCam2k'),[[false,'Clásica (de arriba)'],[true,'2K (detrás de tu jugador)']],()=>!!setup.cam2k,v=>setup.cam2k=v);
 seg($('optCam'),[[true,'Sigue la jugada'],[false,'Fija']],()=>setup.camFollow!==false,v=>setup.camFollow=v);
 $('vibPick').hidden=!touch.on;seg($('optVib'),[[true,'Sí'],[false,'No']],()=>setup.vib!==false,v=>setup.vib=v);
 seg($('optAssist'),[[true,'Sí'],[false,'No']],()=>setup.assist==null?!!touch.on:!!setup.assist,v=>setup.assist=v);
 seg($('optDiff'),[['easy','Fácil'],['normal','Normal'],['hard','Difícil']],()=>setup.diff,v=>setup.diff=v);
 sideCard(0);sideCard(1);
}
/* ===================== ONLINE =====================
   Salas con la capacidad "room" del artifact. El anfitrión simula el partido (manda él) y publica,
   unas 30 veces por segundo, una foto compacta del partido en su "presencia". Cada jugador publica
   en la suya sus controles. Nada de esto se guarda: si el anfitrión se va, la sala se termina. */
/* ===================== ONLINE FUERA DE CLAUDE =====================
   Fuera de claude.ai, las salas van por un servidor propio (Cloudflare Workers + Durable Objects, carpeta server/).
   Este cliente imita la capacidad "room" de los artifacts: presencia por jugador, lista de pares y salas con nombre.
   Se manda solo lo que cambió de la presencia (unas 30 veces por segundo como máximo). */
function wsRoomClient(base){
 const me='p'+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-3);
 base=String(base).replace(/\/+$/,'');
 function mk(name){
  const peers=new Map();let mine={},chg={},dirty=false,ws=null,open=false,closed=false,retry=0,handlers=[],connH=[],cached=Object.freeze([]);
  const selfPeer=()=>Object.freeze({peer:me,by:null,isMe:true,sameTab:true,kind:'viewer',guest:false,presence:Object.freeze(Object.assign({},mine)),updatedAt:Date.now()});
  const other=(peer,presence)=>Object.freeze({peer,by:null,isMe:false,sameTab:false,kind:'viewer',guest:false,presence:Object.freeze(presence),updatedAt:Date.now()});
  peers.set(me,selfPeer());cached=Object.freeze([...peers.values()]);
  const notify=(joined,left,updated)=>{cached=Object.freeze([...peers.values()]);const ch={peers:cached,joined:joined||[],left:left||[],updated:updated||[]};for(const h of handlers.slice()){try{h(ch);}catch(e){console.error(e);}}};
  const flush=()=>{if(!open||!dirty)return;dirty=false;const p=chg;chg={};try{ws.send(JSON.stringify({t:'p',patch:p}));}catch(e){}};
  const timer=setInterval(flush,33);
  function connect(){
   if(closed)return;
   try{ws=new WebSocket(base+'/room/'+encodeURIComponent(name)+'?peer='+me);}catch(e){setTimeout(connect,2000);return;}
   ws.onopen=()=>{open=true;retry=0;chg=Object.assign({},mine);dirty=true;flush();connH.forEach(h=>h(true));};
   ws.onmessage=ev=>{let m;try{m=JSON.parse(ev.data);}catch(e){return;}
    if(m.t==='hello'&&Array.isArray(m.peers)){const left=[];for(const[k,v]of peers)if(k!==me)left.push(v);for(const k of [...peers.keys()])if(k!==me)peers.delete(k);
     const joined=[];for(const q of m.peers){if(!q||q.peer===me)continue;const o=other(String(q.peer),q.presence&&typeof q.presence==='object'?q.presence:{});peers.set(o.peer,o);joined.push(o);}notify(joined,left,[]);}
    else if(m.t==='p'&&m.peer&&m.peer!==me){const cur=peers.get(m.peer),pres=Object.assign({},cur?cur.presence:{});
     if(m.patch&&typeof m.patch==='object')for(const k in m.patch){if(m.patch[k]===null)delete pres[k];else pres[k]=m.patch[k];}
     const o=other(String(m.peer),pres);peers.set(o.peer,o);notify(cur?[]:[o],[],cur?[o]:[]);}
    else if(m.t==='leave'&&m.peer){const q=peers.get(m.peer);if(q&&m.peer!==me){peers.delete(m.peer);notify([],[q],[]);}}};
   ws.onclose=()=>{const was=open;open=false;if(was)connH.forEach(h=>h(false));if(!closed){retry++;setTimeout(connect,Math.min(5000,300*retry));}};
   ws.onerror=()=>{};
  }
  connect();
  const api={name,
   presence(patch){if(!patch||typeof patch!=='object')return Promise.reject({code:'invalid_argument'});
    const next=Object.assign({},mine);for(const k in patch){if(patch[k]===null)delete next[k];else next[k]=patch[k];}
    if(JSON.stringify(next).length>7800)return Promise.reject({code:'invalid_argument',message:'presencia muy grande'});
    mine=next;for(const k in patch)chg[k]=patch[k];dirty=true;peers.set(me,selfPeer());notify([],[],[peers.get(me)]);return Promise.resolve();},
   peers:()=>cached,
   onPeers(h,onErr){handlers.push(h);setTimeout(()=>{if(handlers.includes(h))h({peers:cached,joined:cached,left:[],updated:[]});},0);return()=>{handlers=handlers.filter(x=>x!==h);};},
   connected:()=>open,
   onConnection(h){connH.push(h);setTimeout(()=>h(open),0);return()=>{connH=connH.filter(x=>x!==h);};},
   emit:()=>Promise.reject({code:'not_permitted'}),on:()=>()=>{},
   leave(){closed=true;clearInterval(timer);handlers=[];connH=[];try{ws&&ws.close(1000,'bye');}catch(e){}return Promise.resolve();}};
  return api;
 }
 const lobby=mk('bblobby'),rooms={};
 lobby.join=n=>{
  if(typeof n!=='string'||!/^[a-z0-9][a-z0-9_.-]{0,47}$/.test(n))return Promise.reject({code:'invalid_argument'});
  if(rooms[n])return Promise.resolve(rooms[n]);
  if(Object.keys(rooms).length>=16)return Promise.reject({code:'limit_reached'});
  const r=mk(n),lv=r.leave;r.leave=()=>{delete rooms[n];return lv();};rooms[n]=r;return Promise.resolve(r);};
 lobby.standalone=true;
 return lobby;
}

const NET={room:null,user:null,state:'off',sala:null,code:null,host:false,me:null,names:{},lobbyPeers:[],salaPeers:[],
 cfg:null,asg:{},want:{t:-1,k:0},at:0,lastMid:null,inps:{},cnt:{},snaps:[],evSeq:0,evBuf:[],lastEv:0,uid:null,err:'',uiKey:'',pubTick:-1,endPub:false,hostSeen:0,ip:null};
const NEUT=()=>({mx:0,my:0,kick:false,lob:false,sprint:false,slide:false,dive:false,skill:false,sx:0,sy:0,hx:true});
const r2=v=>Math.round((+v||0)*100)/100;
const cleanTxt=(v,n)=>[...String(v==null?'':v)].filter(ch=>{const c=ch.codePointAt(0);return!(c<32||(c>=127&&c<160)||(c>=0x200b&&c<=0x200f)||(c>=0x2028&&c<=0x202e)||(c>=0x2060&&c<=0x206f));}).join('').trim().slice(0,n||18);
const escH=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function myNick(){if(NET.nick)return NET.nick;try{return cleanTxt(localStorage.getItem('picadito-nick')||'');}catch(e){return'';}}
function setNick(v){NET.nick=cleanTxt(v);try{localStorage.setItem('picadito-nick',NET.nick);}catch(e){}}
function nameOf(p){if(!p)return'Jugador';return cleanTxt(p.presence&&p.presence.nick)||(p.by&&NET.names[p.by])||'Jugador';}
function peerById(id){return NET.salaPeers.find(p=>p.peer===id);}
function hostPeer(){const hs=NET.salaPeers.filter(p=>p.presence&&p.presence.host===1);if(!hs.length)return null;return hs.sort((a,b)=>(a.presence.since||0)-(b.presence.since||0))[0];}
async function netInit(){
 if(NET.state!=='off')return;
 NET.state='connecting';renderOnline(true);
 let room=null,user=null;
 try{if(window.claude&&window.claude.use){[room,user]=await Promise.all([window.claude.use('room'),window.claude.use('user')]);}}catch(e){room=null;}
 if(!room&&window.PICADITO_SERVER){room=wsRoomClient(window.PICADITO_SERVER);user=null;}
 NET.user=user;NET.standalone=!!(room&&room.standalone);
 if(!room){NET.state='none';renderOnline(true);return;}
 if(NET.standalone)room.onConnection(()=>renderOnline(true));
 NET.room=room;NET.state='lobby';setTimeout(pushProf,400);
 room.onPeers(ch=>{NET.lobbyPeers=ch.peers;resolveNames(ch.peers);renderOnline();},e=>{if(e&&e.code==='not_granted'){NET.state='none';renderOnline(true);}});
 try{NET.uid=user&&user.id?await user.id():null;}catch(e){NET.uid=null;}
 renderOnline(true);
}
async function resolveNames(peers){
 if(!NET.user||!NET.user.profiles)return;
 const ids=[...new Set(peers.map(p=>p.by).filter(Boolean))].filter(id=>!(id in NET.names));
 if(!ids.length)return;
 for(const id of ids)NET.names[id]='';
 try{const ps=await NET.user.profiles(ids);for(const id of ids)NET.names[id]=cleanTxt(ps&&ps[id]&&ps[id].name,24);}catch(e){}
 renderOnline(true);netLabels();
}
function randCode(){const a='abcdefghjkmnpqrstuvwxyz23456789';let s='';for(let i=0;i<4;i++)s+=a[Math.floor(Math.random()*a.length)];return s;}
async function joinSala(code,host){
 code=cleanTxt(code,8).toLowerCase().replace(/[^a-z0-9]/g,'');
 if(!code){NET.err='Escribí el código de la sala.';renderOnline(true);return;}
 if(NET.sala)await leaveSala();
 NET.err='';
 let sala;try{sala=await NET.room.join('bb-'+code);}catch(e){NET.err='No se pudo entrar a la sala ('+((e&&e.code)||'error')+'). Probá de nuevo.';renderOnline(true);return;}
 Object.assign(NET,{sala,code,host,state:'sala',at:Date.now(),lastMid:null,asg:{},want:{t:2,k:0},snaps:[],hostSeen:performance.now()});
 if(host){
  const s0=setup.sides;
  NET.cfg={a:s0[0].team,b:s0[1].team===s0[0].team?TEAMS.find(t=>t.id!==s0[0].team).id:s0[1].team,f:Math.max(2,setup.format),d:setup.duration,cap:setup.cap,eq:!!setup.equal};
  NET.want={t:0,k:0};NET.hstate='lobby';NET.mid=0;
 }
 sala.onPeers(ch=>{NET.salaPeers=ch.peers;const me=ch.peers.find(p=>p.isMe&&p.sameTab);if(me)NET.me=me.peer;resolveNames(ch.peers);netOnPeers();},
  e=>{if(NET.sala===sala&&e&&(e.code==='not_permitted'||e.code==='not_granted')){NET.err='Se cortó la conexión con la sala.';leaveSala();}});
 pushMine();renderOnline(true);
}
async function leaveSala(){
 const s=NET.sala;NET.sala=null;NET.salaPeers=[];NET.host=false;NET.code=null;NET.state=NET.room?'lobby':'none';
 if(NET.room)NET.room.presence({sala:null}).catch(()=>{});
 if(s)try{await s.leave();}catch(e){}
 if(game&&game.net){startDemo();showScreen('menu');}
 renderOnline(true);
}
function pushMine(extra){
 if(!NET.sala)return;
 const o={nick:myNick(),want:NET.want,at:NET.at,uid:NET.uid||null};
 if(NET.host)Object.assign(o,{host:1,since:NET.at,cfg:NET.cfg,asg:NET.asg,st:NET.hstate,mid:NET.mid});
 NET.sala.presence(Object.assign(o,extra||{})).catch(()=>{});
 if(NET.host&&NET.room){const humans=Object.keys(NET.asg).length;
  NET.room.presence({sala:{n:myNick(),c:NET.code,f:NET.cfg.f,a:NET.cfg.a,b:NET.cfg.b,p:NET.salaPeers.length||1,h:humans,s:NET.hstate==='play'?'jugando':'espera'}}).catch(()=>{});}
}
// ----- lugares: el anfitrión decide quién juega con quién (por orden de llegada) -----
function maxHumans_fut(f){return f+(f>=2?1:0);}
function computeAsg(){
 const c=NET.cfg,asg={},taken=[new Set(),new Set()];
 const ps=NET.salaPeers.filter(p=>p.presence&&p.presence.want).slice().sort((a,b)=>(a.presence.at||0)-(b.presence.at||0)||(a.peer<b.peer?-1:1));
 for(const p of ps){
  const w=p.presence.want,fo=NET.forced&&NET.forced[p.peer];let t=w.t;
  if(t===2){const n0=taken[0].size,n1=taken[1].size,mx=maxHumans(c.f);t=n0<=n1?(n0<mx?0:1):(n1<mx?1:0);if(taken[t].size>=mx)continue;}
  if(t!==0&&t!==1)continue;if(fo&&fo.at===(p.presence.at||0))t=fo.t;
  const tm=teamOf(t===0?c.a:c.b),T=taken[t];if(T.size>=maxHumans(c.f))continue;
  const field=[...T].filter(i=>i>=0).length;
  let k=w.t===2?null:w.k|0;if(k===-1&&c.f<2)k=0;if(k==null){k=[...tm.players.keys()].find(i=>!T.has(i));if(k==null)k=0;}if(k<-1||k>=tm.players.length)k=0;
  if(k>=0&&field>=c.f)k=null;
  if(k!=null&&T.has(k)){k=k===-1?null:null;}
  if(k==null){ // lo que quedó libre
   if(field<c.f)k=[...tm.players.keys()].find(i=>!T.has(i));

   if(k==null)continue;}
  T.add(k);asg[p.peer]={t,k};
 }
 return asg;
}
function netOnPeers(){
 const hp=hostPeer();
 if(game&&game.net)netLabels();
 if(!NET.seenChat)NET.seenChat={};
 for(const p of NET.salaPeers){if(p.isMe&&p.sameTab)continue;const ch=p.presence&&p.presence.chat;if(ch&&ch.t&&ch.t!==NET.seenChat[p.peer]){if(NET.seenChat[p.peer]!==undefined||Date.now()-ch.t<4000)netChatAdd(p.peer,cleanTxt(ch.m,60));NET.seenChat[p.peer]=ch.t;}}
 if(NET.host){
  // controles de cada jugador
  for(const p of NET.salaPeers)if(!p.isMe||!p.sameTab)NET.inps[p.peer]=p.presence&&p.presence.in||null;
  if(NET.hstate!=='play'){const a=computeAsg();if(JSON.stringify(a)!==JSON.stringify(NET.asg)){NET.asg=a;pushMine();}}
  // alguien se fue en pleno partido: su jugador pasa a la CPU
  if(game&&game.net&&game.net.host)for(const id in game.ctrls){const c=game.ctrls[id];if(c.peer&&c.peer!==NET.me&&!peerById(c.peer)){game.ctrls[id]={type:'ai',diff:'normal'};const pl=game.state.players[id];pl.hgk=false;popup('SE DESCONECTÓ',pl.x,pl.y,'#ff5a4f');}}
  if(NET.room)pushMineLobbyCount();
 }else if(hp){
  if(NET.hostId!==hp.peer){if(NET.hostId)NET.snaps=[];NET.hostId=hp.peer;}
  const pr=hp.presence;NET.cfg=pr.cfg||NET.cfg;NET.asg=pr.asg||{};
  if(pr.st==='play'&&pr.mid&&pr.mid!==NET.lastMid&&NET.me&&pr.cfg){startNetMatch(pr.cfg,pr.asg||{},pr.mid,false);}
  if(game&&game.net&&!game.net.host&&pr.snap&&pr.snap.m===NET.lastMid){const sn=pr.snap,S=NET.snaps;if(!S.length||sn.k>S[S.length-1].k){S.push(Object.assign({at:performance.now()},sn));if(S.length>24)S.shift();}}
 }
 renderOnline();
}
let lobbyCountT=0;
function pushMineLobbyCount(){const now=performance.now();if(now-lobbyCountT<1500)return;lobbyCountT=now;const n=NET.salaPeers.length;if(n!==NET.lastCount){NET.lastCount=n;pushMine();}}
// ----- partido -----
function startNetMatch_fut(c,asg,mid,host){
 NET.lastMid=mid;NET.snaps=[];NET.lastEv=0;NET.evSeq=0;NET.evBuf=[];NET.cnt={};NET.pubTick=-1;NET.endPub=false;NET.endShown=false;NET.hostSeen=performance.now();
 const humans=[];
 for(const peer in asg){const a=asg[peer],tm=teamOf(a.t===0?c.a:c.b);if(a.k!==-1&&!tm.players[a.k])continue;humans.push({team:a.t,gk:a.k===-1,k:a.k,name:a.k===-1?tm.gk.n:tm.players[a.k].n,peer});}
 const cfg={format:c.f,duration:c.d,cap:c.cap,equal:!!c.eq,diff:'normal',tie:'golden',replays:false,sides:[{team:c.a,player:0,ctrl:'CPU',kit:'auto'},{team:c.b,player:0,ctrl:'CPU',kit:'auto'}]};
 startMatch(cfg,null,{humans,host});
 netLabels();
 game.myId=null;for(const id in game.ctrls)if(game.ctrls[id].peer===NET.me)game.myId=+id;
 NET.hist=[];NET.disp=null;NET.run=0;if(NET.sala)NET.sala.presence({inm:mid}).catch(()=>{});
 const mine=humans.find(h=>h.peer===NET.me);
 $('hint').textContent=(mine?(mine.gk?'Sos el arquero · E agarrar (en el área) · Q estirada · Espacio sacar':'Sos '+mine.name+' · WASD · Espacio patear · E globo · Q barrida'):'Estás mirando')+' · Esc menú · Sala '+NET.code.toUpperCase();
}
function myTeam(){const a=NET.asg&&NET.asg[NET.me];return a?a.t:-1;}
function netLabels(){
 if(!game||!game.net)return;const mt=myTeam();
 for(const id in game.ctrls){const c=game.ctrls[id];if(!c.peer)continue;const p=game.state.players[id];
  c.label=(c.peer===NET.me?'VOS':nameOf(peerById(c.peer)))+(p.role==='gk'?' 🧤':'');
  c.col=c.peer===NET.me?'#3fd8ff':mt<0?(p.team===0?'#ffd24a':'#9be7ff'):p.team===mt?'#7dff4f':'#ff5aa8';}
}
function netInput(peer){
 const r=NET.inps[peer];if(!r||typeof r!=='object')return NEUT();
 const c=Array.isArray(r.c)?r.c.map(v=>v|0):[0,0,0,0,0];while(c.length<5)c.push(0);
 let st=NET.cnt[peer];if(!st)st=NET.cnt[peer]={c:c.slice(),hold:[0,0,0,0,0]};
 const bits=r.b|0,cl=v=>Math.max(-1,Math.min(1,+v||0));
 const o=NEUT();o.mx=cl(r.x);o.my=cl(r.y);const l=Math.hypot(o.mx,o.my);if(l>1){o.mx/=l;o.my/=l;}
 o.sprint=!!(bits&4);o.assist=!!(bits&16);
 if(Array.isArray(r.a)&&r.a.length===2&&isFinite(r.a[0])&&isFinite(r.a[1])){o.aim=true;o.tx=Math.max(-60,Math.min(60,+r.a[0]));o.ty=Math.max(-40,Math.min(40,+r.a[1]));}(NET.ack||(NET.ack={}))[peer]=r.q|0;
 const nm=['kick','lob','slide','skill','pass'],bt=[1,2,8,0,32];
 for(let i=0;i<5;i++){if(c[i]!==st.c[i]){if(c[i]>st.c[i])st.hold[i]=i===3?1:2;st.c[i]=c[i];}
  o[nm[i]]=(bt[i]&&!!(bits&bt[i]))||st.hold[i]>0;if(st.hold[i]>0)st.hold[i]--;}
 if(o.skill){o.sx=Math.sign(+r.sx||0);o.sy=Math.sign(+r.sy||0);}
 return o;
}
function netSendInput(){
 if(!NET.sala)return;
 const inp=game.netMenu?NEUT():readHuman(1);
 const P=NET.ip||(NET.ip={c:[0,0,0,0,0],prev:[false,false,false,false,false],last:'',q:0});
 const arr=[inp.kick,inp.lob,inp.slide,inp.skill,inp.pass];
 for(let i=0;i<5;i++){if(arr[i]&&!P.prev[i])P.c[i]++;P.prev[i]=arr[i];}
 if(inp.skill){P.sx=inp.sx;P.sy=inp.sy;}
 P.q=(P.q||0)+1;
 const msg={x:r2(inp.mx),y:r2(inp.my),b:(inp.kick?1:0)|(inp.lob?2:0)|(inp.sprint?4:0)|(inp.slide?8:0)|(inp.assist?16:0)|(inp.pass?32:0),c:P.c.slice(),sx:P.sx||0,sy:P.sy||0,q:P.q,a:inp.aim?[r2(inp.tx),r2(inp.ty)]:0};
 NET.sala.presence({in:msg}).catch(()=>{});
 const H=NET.hist||(NET.hist=[]);H.push({q:P.q,mx:inp.mx,my:inp.my,spr:!!inp.sprint,dt:NET.lastDt||1/60});if(H.length>240)H.shift();
}
function netCollect(evs){
 for(const e of evs){const o={};for(const k in e){const v=e[k];if(typeof v==='number')o[k]=r2(v);else if(typeof v==='string')o[k]=v.slice(0,40);else if(typeof v==='boolean')o[k]=v;}
  NET.evBuf.push([++NET.evSeq,o]);}
 while(NET.evBuf.length>12)NET.evBuf.shift();
}
function netSnap(s){
 const b=s.ball;
 const o={scl:r2(s.shotClock),m:NET.lastMid,k:s.tick,ph:s.phase,pt:r2(s.phaseT),c:r2(s.clock),g:s.golden?1:0,ot:r2(s.ot),sc:s.score.slice(),kt:s.kickoffTeam,lg:s.lastGoalTeam==null?-1:s.lastGoalTeam,
  b:[r2(b.x),r2(b.y),r2(b.z),r2(b.vx),r2(b.vy),r2(b.vz),b.holder,r2(b.roll),b.lastTouch,b.lastTeam],
  p:s.players.map(p=>[r2(p.x),r2(p.y),r2(p.face),r2(p.run%1000),r2(p.vx),r2(p.vy),null,0,r2(p.kickAnim),0,1,r2(p.stunT),r2(p.charge),p.charging?1:0,r2(p.stam),p.skill?[p.skill.type,r2(p.skill.t),r2(p.skill.dur),0]:0,0,r2(p.jz),r2(p.shootT),r2(p.swipeT),r2(p.dunkT),p.pressing?1:0,p.fire?1:0]),
  q:s.players.map(p=>{const c=game.ctrls[p.id];return c&&c.peer&&c.peer!==NET.me?((NET.ack&&NET.ack[c.peer])|0):0;}),
  e:NET.evBuf.slice()};
 if(s.phase==='end')o.scr=s.scorers.slice(-12).map(x=>({name:String(x.name).slice(0,30),team:x.team,own:!!x.own,t:r2(x.t),golden:!!x.golden}));
 // la presencia entera no puede pasar de 4 KiB
 while(o.e.length&&JSON.stringify(o).length>2900)o.e.shift();
 return o;
}
function netHostPublish(){
 const s=game.state;
 if(s.phase==='end'){if(NET.endPub)return;NET.endPub=true;NET.hstate='end';pushMine({snap:netSnap(s)});return;}
 if(s.tick-NET.pubTick<2)return;NET.pubTick=s.tick;
 NET.sala.presence({snap:netSnap(s)}).catch(()=>{});
}
function netApply(a,b,u){
 const s=game.state,L=(x,y)=>x+(y-x)*u;
 s.tick=b.k;s.phase=b.ph;s.shotClock=b.scl;s.phaseT=b.pt;s.clock=b.c;s.golden=!!b.g;s.ot=b.ot;s.score=b.sc;s.kickoffTeam=b.kt;s.lastGoalTeam=b.lg<0?null:b.lg;
 const A=a.b,B=b.b,bl=Math.hypot(B[0]-A[0],B[1]-A[1])>4?1:u,bb=s.ball;
 bb.x=A[0]+(B[0]-A[0])*bl;bb.y=A[1]+(B[1]-A[1])*bl;bb.z=A[2]+(B[2]-A[2])*bl;bb.vx=B[3];bb.vy=B[4];bb.vz=B[5];bb.holder=B[6];bb.roll=B[7];if(B[8]!=null){bb.lastTouch=B[8];bb.lastTeam=B[9];}
 s.players.forEach((p,i)=>{const P=a.p[i],Q=b.p[i];if(!P||!Q)return;const t=Math.hypot(Q[0]-P[0],Q[1]-P[1])>3?1:u;
  p.x=P[0]+(Q[0]-P[0])*t;p.y=P[1]+(Q[1]-P[1])*t;p.face=Q[2];p.run=L(P[3],Q[3]);p.vx=Q[4];p.vy=Q[5];p.dive=Q[6]==null?null:{dy:Q[6]};p.diveT=Q[7];p.kickAnim=Q[8];p.slideT=Q[9];p.slideDx=Q[10];p.stunT=Q[11];
  p.charge=Q[12];p.charging=!!Q[13];p.stam=Q[14];p.jz=Q[17]||0;p.shootT=Q[18]||0;p.swipeT=Q[19]||0;p.dunkT=Q[20]||0;p.pressing=!!Q[21];p.fire=!!Q[22];p.skill=Q[15]?{type:Q[15][0],t:Q[15][1],dur:Q[15][2],burst:!!Q[15][3]}:null;p.kind=Q[16]?'lob':'kick';});
}
function netClient(dt){
 NET.lastDt=Math.min(0.1,dt||1/60);netSendInput();
 if(hostPeer())NET.hostSeen=performance.now();
 const gone=performance.now()-NET.hostSeen;
 if(gone>1500&&!NET.endShown&&NET.snaps.length&&game.state.phase!=='end'&&netSuccessor()===NET.me){netPromote();return;}
 if(gone>7000&&!NET.endShown){NET.endShown=true;banner('SE CORTÓ','El anfitrión se fue de la sala',3);setTimeout(()=>{if(game&&game.net&&!game.net.host){startDemo();showScreen('menu');setup.mode='online';renderMenu();}},2600);return;}
 const S=NET.snaps;if(!S.length)return;
 const now=performance.now(),last=S[S.length-1];
 const rt=last.k+Math.min(6,(now-last.at)/1000*60)-4;
 let a=S[0],b=S[0];
 for(let i=S.length-1;i>=0;i--){if(S[i].k<=rt){a=S[i];b=S[i+1]||S[i];break;}}
 const u=b.k>a.k?Math.max(0,Math.min(1,(rt-a.k)/(b.k-a.k))):0;
 netApply(a,b,u);
 const s=game.state,mi=game.myId,mp=mi!=null?s.players[mi]:null,ix=mp?mp.x:0,iy=mp?mp.y:0;
 netPredict(last,dt);
 if(mp){const bb=s.ball,own=bb.holder===mi||bb.holder<0&&bb.lastTouch===mi&&bb.z<0.5&&Math.hypot(bb.x-ix,bb.y-iy)<SIM.PR+SIM.BR+0.75;
  NET.bw=(NET.bw||0)+((own?1:0)-(NET.bw||0))*Math.min(1,NET.lastDt*12);
  if(NET.bw>0.01){bb.x+=(mp.x-ix)*NET.bw;bb.y+=(mp.y-iy)*NET.bw;}}
 for(const e of last.e||[])if(Array.isArray(e)&&e[0]>NET.lastEv){NET.lastEv=e[0];if(e[1]&&typeof e[1].t==='string')s.events.push(e[1]);}
 handleEvents();
 if(last.ph==='end'&&!NET.endShown){NET.endShown=true;netApply(last,last,0);s.phase='end';s.scorers=Array.isArray(last.scr)?last.scr:[];setTimeout(()=>{if(game&&game.net)showEnd();},600);}
}
function netStart(){
 if(!NET.host)return;
 NET.asg=computeAsg();NET.mid=(Date.now()%2e9)+1;NET.hstate='play';
 pushMine({snap:null});
 startNetMatch(NET.cfg,NET.asg,NET.mid,true);
}
function netBackToSala(){
 if(NET.host&&NET.hstate!=='lobby'){NET.hstate='lobby';pushMine({snap:null});}
 if(NET.sala)NET.sala.presence({in:null,inm:null}).catch(()=>{});NET.ip=null;
 startDemo();showScreen('menu');setup.mode='online';renderMenu();
}
// ----- predicción del propio jugador (invitado) -----
// El anfitrión devuelve el número del último control que procesó de cada uno; el invitado parte de la posición
// del anfitrión y le vuelve a aplicar los controles que todavía no vio. La diferencia se corrige suave.
function netPredict(last,dt){
 const s=game.state,id=game.myId;if(id==null||!last||!last.q)return;
 const p=s.players[id],Q=last.p[id];if(!p||!Q)return;
 const H=NET.hist||(NET.hist=[]),ack=last.q[id]|0;while(H.length&&H[0].q<=ack)H.shift();
 const busy=p.dive||p.slideT>0||p.stunT>0||p.skill||p.jz>0||p.charging||s.phase==='goal'||s.phase==='end'||p.headT>0;
 if(busy||H.length>150||!ack){NET.disp=null;return;}
 let x=Q[0],y=Q[1],vx=Q[4],vy=Q[5];const L2=s.L/2,W2=s.W/2,R=SIM.PR;
 for(const h of H){const m=Math.min(1,Math.hypot(h.mx,h.my)),sc=m>1?1/m:1;
  const spd=p.maxSpd*(h.spr&&p.stam>0.03&&m>0.1?1.25:1)*(p.charging?0.85:1),k=1-Math.exp(-(m>0.1?p.accel:p.accel*1.5)*h.dt);
  vx+=(h.mx*sc*spd-vx)*k;vy+=(h.my*sc*spd-vy)*k;x=Math.max(-L2+R,Math.min(L2-R,x+vx*h.dt));y=Math.max(-W2+R,Math.min(W2-R,y+vy*h.dt));}
 let D=NET.disp;
 if(!D||Math.hypot(D.x-x,D.y-y)>2.2)D=NET.disp={x,y};
 else{const gx=D.x+vx*dt,gy=D.y+vy*dt,a=Math.min(1,dt*14);D.x=gx+(x-gx)*a;D.y=gy+(y-gy)*a;}
 p.x=D.x;p.y=D.y;p.vx=vx;p.vy=vy;const sp=Math.hypot(vx,vy);
 if(sp>0.6){p.face=Math.atan2(vy,vx);NET.run=(NET.run||p.run)+sp*dt*1.7;p.run=NET.run;}
}
// ----- si se va el anfitrión: sigue el primero (por orden) de los que están en el partido -----
function netSuccessor(){
 const c=NET.salaPeers.filter(p=>p.presence&&p.presence.inm===NET.lastMid&&p.peer!==NET.hostId).map(p=>p.peer);
 if(NET.me&&!c.includes(NET.me))c.push(NET.me);c.sort();return c[0];
}
function netPromote(){
 const s=game.state;
 NET.host=true;game.net.host=true;NET.hstate='play';NET.mid=NET.lastMid;NET.at=Date.now();
 NET.inps={};NET.cnt={};NET.ack={};NET.pubTick=-1;NET.evBuf=[];NET.endPub=false;NET.hist=[];NET.disp=null;
 s.events.length=0;acc=0;
 for(const id in game.ctrls){const c=game.ctrls[id];if(!c.peer)continue;if(c.peer===NET.me)c.slot=1;else if(!peerById(c.peer)){game.ctrls[id]={type:'ai',diff:'normal'};s.players[id].hgk=false;}}
 pushMine({snap:netSnap(s)});netLabels();
 banner('SOS EL ANFITRIÓN','Se fue el anfitrión: el partido sigue en tu navegador',2.4);
}
// ----- chat -----
const CHAT_QUICK=['¡TRIPLE!','¡PASALA!','¡DEFENSA!','¡UFF, CASI!','JAJAJA','¡VAMOS!'];
function netChat(text){
 text=cleanTxt(text,60);if(!text||!NET.sala)return;
 const now=Date.now();if(now-(NET.lastChat||0)<900)return;NET.lastChat=now;
 NET.sala.presence({chat:{t:now,m:text}}).catch(()=>{});netChatAdd(NET.me,text);
}
function netChatAdd(peer,text){
 const L=NET.chatLog||(NET.chatLog=[]);
 L.push({peer,text,at:performance.now()});if(L.length>40)L.shift();
 (NET.bubbles||(NET.bubbles={}))[peer]={text,until:performance.now()+3200};
 updChatUI();
}
function chatName(peer){return peer===NET.me?'Vos':nameOf(peerById(peer));}
function updChatUI(){
 const L=NET.chatLog||[];
 if(NET.chatEl){const lg=NET.chatEl.querySelector('.olog');lg.innerHTML=L.slice(-8).map(m=>`<div><b>${escH(chatName(m.peer))}:</b> ${escH(m.text)}</div>`).join('')||'<div class="sub">Todavía no hay mensajes.</div>';lg.scrollTop=lg.scrollHeight;}
 const fd=$('chatFeed');if(fd){const now=performance.now(),rec=L.filter(m=>now-m.at<7000).slice(-4);fd.hidden=!(game&&game.net)||!rec.length;fd.innerHTML=rec.map(m=>`<div><b>${escH(chatName(m.peer))}</b> ${escH(m.text)}</div>`).join('');}
}
setInterval(updChatUI,1000);
function chatBox(){
 if(NET.chatEl)return NET.chatEl;
 const d=document.createElement('div');d.className='ochat';
 d.innerHTML=`<p class="label">Chat de la sala</p><div class="olog"></div><div class="orow"><input id="onChatIn" maxlength="60" placeholder="Escribí y apretá Enter" autocomplete="off"><button class="btn-cont" id="onChatSend">ENVIAR</button></div><div class="oquick">${CHAT_QUICK.map((q,i)=>`<button type="button" data-q="${i}">${escH(q)}</button>`).join('')}</div>`;
 const inp=d.querySelector('#onChatIn');
 const send=()=>{netChat(inp.value);inp.value='';};
 d.querySelector('#onChatSend').onclick=send;inp.onkeydown=e=>{e.stopPropagation();if(e.key==='Enter')send();};
 d.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>netChat(CHAT_QUICK[+b.dataset.q]));
 NET.chatEl=d;updChatUI();return d;
}
// frases rápidas en el partido: teclas 1 a 6, o el botón CHAT en el celular
addEventListener('keydown',e=>{
 if(!game||!game.net||e.repeat||document.activeElement&&document.activeElement.tagName==='INPUT')return;
 const m=/^Digit([1-6])$/.exec(e.code||'');if(m){netChat(CHAT_QUICK[+m[1]-1]);}
});
// equipos: cambiarse y mezclar
function netSwitchTeam(){
 const a=NET.asg[NET.me];if(!a)return;const t=1-a.t,c=NET.cfg,tm=teamOf(t===0?c.a:c.b);
 const used=new Set(Object.values(NET.asg).filter(x=>x.t===t).map(x=>x.k));let k=[...tm.players.keys()].find(i=>!used.has(i));
 NET.want={t,k:k==null?0:k};NET.at=Date.now();pushMine();renderOnline(true);
}
function netShuffle(){
 if(!NET.host)return;const ps=NET.salaPeers.filter(p=>p.presence&&p.presence.want&&(p.presence.want.t===0||p.presence.want.t===1));
 for(let i=ps.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[ps[i],ps[j]]=[ps[j],ps[i]];}
 NET.forced={};ps.forEach((p,i)=>{NET.forced[p.peer]={t:i%2,at:p.presence.at||0};});
 NET.asg=computeAsg();pushMine();renderOnline(true);
}

// ----- pantalla de salas -----
function teamSelect(id,val){
 return`<select class="cat" id="${id}">${CATS.map(c=>`<optgroup label="${escH(c.name)}">${TEAMS.filter(t=>t.cat===c.id).map(t=>`<option value="${t.id}"${t.id===val?' selected':''}>${escH(t.name)}</option>`).join('')}</optgroup>`).join('')}</select>`;
}
// link de invitación: …#sala-abcd (al abrirlo, el amigo pone su nombre y entra directo)
function inviteCode(){const m=/^#sala-([a-z0-9]{3,8})$/i.exec(location.hash||'');return m?m[1].toLowerCase():null;}
function inviteLink(code){try{const u=new URL(location.href);u.hash='sala-'+code;return u.toString();}catch(e){return'';}}
const PCOL=['#3fd8ff','#ff5aa8','#7dff4f','#ffd24a','#b48cff','#ff8a3d','#5affd6','#ff6b6b'];
function peerCol(peer){let h=7;for(const ch of String(peer))h=(Math.imul(h,31)+ch.charCodeAt(0))|0;return PCOL[Math.abs(h)%PCOL.length];}
function avatar(name,col){const ch=([...String(name||'?')][0]||'?').toUpperCase();return`<span class="oav" style="--c:${col}">${escH(ch)}</span>`;}
function nameDraft(){const i=$('onNameIn');return cleanTxt(i?i.value:(NET.draft!=null?NET.draft:myNick()),18);}
function goJoin(code,host){
 const v=nameDraft();
 if(!v){NET.err='Poné tu nombre primero: así tus amigos saben quién sos.';renderOnline(true);setTimeout(()=>{const i=$('onNameIn');if(i)i.focus();},30);return;}
 setNick(v);NET.nameOk=true;NET.draft=null;NET.err='';pushProf();joinSala(code,host);
}
function copyText(t,btn){
 const done=ok=>{if(btn){const o=btn.textContent;btn.textContent=ok?'¡COPIADO!':'SELECCIONALO Y COPIÁ';setTimeout(()=>{btn.textContent=o;},1600);}};
 try{navigator.clipboard.writeText(t).then(()=>done(true),()=>{selLink();done(false);});}catch(e){selLink();done(false);}
 function selLink(){const i=$('onLinkTxt');if(i){i.hidden=false;i.focus();i.select();}}
}
function salaCard(p){
 const s=p.presence.sala,ta=teamOf(s.a)||TEAMS[0],tb=teamOf(s.b)||TEAMS[1],hn=cleanTxt(s.n)||nameOf(p),pl=s.s==='jugando';
 return`<button type="button" class="osala" data-join="${escH(s.c)}">${avatar(hn,peerCol(p.peer))}
  <span class="oinfo"><b>Sala de ${escH(hn)}</b><span class="sub">${chip(ta.id)}${escH(ta.name)} vs ${chip(tb.id)}${escH(tb.name)} · ${s.f|0} vs ${s.f|0}</span>
  <span class="sub">${s.p|0} ${(s.p|0)===1?'persona':'personas'} · ${pl?'<i class="olive">jugando</i>':'esperando'} · código ${escH(String(s.c).toUpperCase())}</span></span><span class="ojoin">ENTRAR ›</span></button>`;
}
function renderOnline(force){
 const el=$('online');if(!el||setup.mode!=='online'||$('menu').hidden)return;
 const st=NET.state;
 const hp=NET.sala?hostPeer():null;
 const key=JSON.stringify([st,myNick(),NET.err,NET.code,NET.host,NET.names,NET.cfg,NET.asg,NET.want,
  NET.standalone&&NET.room&&NET.room.connected(),st==='lobby'?NET.lobbyPeers.map(p=>[p.peer,p.by,p.presence.sala,p.presence.prof]):0,
  NET.sala?NET.salaPeers.map(p=>[p.peer,p.by,p.presence.nick,p.presence.want,p.presence.host,p.presence.st]):0]);
 if(!force&&key===NET.uiKey)return;NET.uiKey=key;
 const nick=myNick();
 if(st==='off'||st==='connecting'){el.dataset.view='wait';el.innerHTML=`<p class="label">Online</p><p class="small-note">Conectando con las salas…</p>`;return;}
 if(st==='none'){el.dataset.view='none';el.innerHTML=window.claude?`<p class="label">Online</p><p class="onote">El online funciona en el juego publicado en claude.ai, abierto con tu cuenta. Tus amigos tienen que abrir el mismo link con su cuenta: personas de tu organización o invitadas al artifact. Desde un link público o sin iniciar sesión no se puede conectar.</p>`
  :`<p class="label">Online</p><p class="onote">Esta copia del juego no tiene un servidor de salas configurado. Quien la publicó tiene que poner la dirección del servidor en <b>config.js</b> (los pasos están en el README).</p>`;return;}
 if(st==='lobby'){
  // el esqueleto (con el campo del nombre) se arma una vez, así no se pierde lo que estás escribiendo
  if(el.dataset.view!=='lobby'){
   el.dataset.view='lobby';
   el.innerHTML=`<div class="ohead"><p class="label">Online</p><span class="sub" id="onConn"></span></div>
   <div class="oname"><label class="olab">Tu nombre<input id="onNameIn" maxlength="18" value="${escH(NET.draft!=null?NET.draft:nick)}" placeholder="¿Cómo te ven tus amigos?" autocomplete="nickname"></label>
    <p class="small-note">Aparece en la sala, en el chat y arriba de tu jugador. Lo podés cambiar cada vez que entrás.</p></div>
   <div id="onInvSlot"></div>
   <p class="oerr" id="onErr" hidden></p>
   <div class="ochoice">
    <div class="obox"><p class="label">Salas abiertas</p><div class="olist" id="onList"></div></div>
    <div class="obox"><p class="label">Armar un partido</p>
     <button class="play osm" id="onCreate">CREAR SALA</button>
     <p class="small-note">Después les pasás el link (o el código) a tus amigos.</p>
     <details class="ocode"><summary>Tengo un código</summary><div class="orow"><input id="onCode" maxlength="6" placeholder="abcd" autocapitalize="off" autocomplete="off"><button class="btn-cont" id="onJoinCode">ENTRAR</button></div></details>
    </div>
   </div>
   <div class="obox orankbox"><p class="label">Ranking de los que están conectados</p><div id="onRank"></div><p class="small-note">Cada uno guarda su perfil en su navegador; suma los partidos online que termina.</p></div>
   <p class="onote">${NET.standalone?'Tus amigos abren este mismo juego: ven tu sala acá abajo y entran con un toque.':'Tus amigos tienen que abrir este mismo link con su cuenta de Claude (personas de tu organización o invitadas al artifact).'}</p>`;
   const inp=$('onNameIn');
   inp.oninput=()=>{NET.draft=inp.value;};
   inp.onkeydown=e=>{e.stopPropagation();if(e.key!=='Enter')return;const inv=inviteCode(),sl=lobbySalas();if(inv)goJoin(inv,false);else if(sl.length===1)goJoin(sl[0].presence.sala.c,false);else if(nameDraft()){setNick(nameDraft());inp.blur();}};
   $('onCreate').onclick=()=>goJoin(randCode(),true);
   $('onJoinCode').onclick=()=>goJoin($('onCode').value,false);
   $('onCode').onkeydown=e=>{e.stopPropagation();if(e.key==='Enter')$('onJoinCode').click();};
   setTimeout(()=>{try{if(!touch.on||!nick){inp.focus();inp.select();}}catch(e){}},30);
  }
  const salas=lobbySalas(),inv=inviteCode();
  $('onConn').textContent=NET.standalone&&!NET.room.connected()?'conectando con el servidor…':'';
  const er=$('onErr');er.hidden=!NET.err;er.textContent=NET.err||'';
  const invSlot=$('onInvSlot');
  const invHost=inv&&salas.find(p=>p.presence.sala.c===inv);
  invSlot.innerHTML=inv?`<div class="oinv"><p>Te invitaron a ${invHost?'la sala de <b>'+escH(cleanTxt(invHost.presence.sala.n)||nameOf(invHost))+'</b>':'la sala <b class="code">'+escH(inv.toUpperCase())+'</b>'}</p><button class="play osm" id="onInv">ENTRAR A LA SALA</button></div>`:'';
  if(inv)$('onInv').onclick=()=>goJoin(inv,false);
  const list=$('onList');
  list.innerHTML=salas.length?salas.map(salaCard).join(''):'<p class="small-note">Todavía no hay salas. Cuando un amigo cree una, aparece acá.</p>';
  list.querySelectorAll('[data-join]').forEach(b=>b.onclick=()=>goJoin(b.dataset.join,false));
  const rk=$('onRank');if(rk)rk.innerHTML=rankHTML();
  return;
 }
 el.dataset.view='sala';
 const c=NET.cfg;
 if(!c||!hp&&!NET.host){el.innerHTML=`<div class="ohead"><p class="label">Sala ${escH((NET.code||'').toUpperCase())}</p><button class="btn-cont" id="onLeave">SALIR</button></div><p class="small-note">Buscando al anfitrión de la sala…</p>`;$('onLeave').onclick=()=>leaveSala();return;}
 const myA=NET.asg[NET.me];
 const hostName=NET.host?nick||'Vos':nameOf(hp);
 const team=t=>{
  const tm=teamOf(t===0?c.a:c.b),mine=Object.entries(NET.asg).filter(([,a])=>a.t===t);
  const used=new Set(mine.map(([,a])=>a.k));
  const gk=mine.find(([,a])=>a.k===-1),field=mine.filter(([,a])=>a.k>=0).sort((x,y)=>x[1].k-y[1].k);
  const slots=[];
  for(let i=0;i<c.f;i++)slots.push(['f',field[i]?field[i][0]:null,field[i]?field[i][1].k:null]);
  const card=([kind,peer,k])=>{
   if(!peer)return`<button type="button" class="ocard cpu" data-t="${t}" data-k="${kind==='gk'?-1:'f'}"><span class="oav cpu">CPU</span><span class="oinfo"><b>${kind==='gk'?'Arquero':'Lugar libre'}</b><span class="sub">lo juega la CPU</span></span><span class="ojoin">${myA&&myA.t===t&&kind!=='gk'&&myA.k>=0?'':'SUMARME'}</span></button>`;
   const me=peer===NET.me,p=me?{presence:{nick}}:peerById(peer),nm=me?(nick||'Vos'):nameOf(p),isHost=me?NET.host:!!(p&&p.presence&&p.presence.host===1);
   const fb=k===-1?'🧤 '+tm.gk.n+' (arquero)':(tm.players[k]?tm.players[k].n+' #'+tm.players[k].num:'');
   let pick='';
   if(me&&k>=0){pick=`<select class="opick" id="onPick${t}" aria-label="Elegí tu jugador">${tm.players.map((pl,i)=>used.has(i)&&i!==k?'':`<option value="${i}"${i===k?' selected':''}>${escH(pl.n)} #${pl.num}</option>`).join('')}</select>`;}
   return`<div class="ocard${me?' me':''}">${avatar(nm,me?'#3fd8ff':peerCol(peer))}<span class="oinfo"><b>${escH(nm)}${me?' <i>(vos)</i>':''}${isHost?' <i class="otag">ANFITRIÓN</i>':''}</b>${pick||`<span class="sub">${escH(fb)}</span>`}</span></div>`;};
  return`<div class="oteam"><p class="tname">${chip(tm.id)}${escH(tm.name)} <span class="sub">${t===0?'local':'visitante'} · ${mine.length}/${maxHumans(c.f)}</span></p>${slots.map(card).join('')}</div>`;};
 const watchers=NET.salaPeers.filter(p=>!NET.asg[p.peer]);
 const link=NET.standalone?inviteLink(NET.code):'';
 el.innerHTML=`<div class="ohead"><div><p class="label">Sala de ${escH(hostName)}</p>
   <p class="ocodeline">Código <b class="code">${escH(NET.code.toUpperCase())}</b>${link?' <button class="btn-cont" id="onCopy">COPIAR LINK DE INVITACIÓN</button>':''}</p>${link?`<input class="olinktxt" id="onLinkTxt" value="${escH(link)}" readonly hidden>`:''}</div>
  <button class="btn-cont" id="onLeave">SALIR</button></div>
 ${NET.host?`<details class="ocfgd"${NET.cfgOpen===false?'':' open'}><summary>Partido: ${escH(teamOf(c.a).name)} vs ${escH(teamOf(c.b).name)} · ${c.f} vs ${c.f} · ${Math.round(c.d/60)} min${c.cap?' · a '+c.cap+' puntos':''}</summary>
   <div class="ocfg"><label class="olab">Local${teamSelect('onA',c.a)}</label><label class="olab">Visitante${teamSelect('onB',c.b)}</label>
   <div><p class="label">Formato</p><div class="seg" id="onF"></div></div><div><p class="label">Duración</p><div class="seg" id="onD"></div></div><div><p class="label">Gana quien llega a</p><div class="seg" id="onCap"></div></div></div></details>`
  :`<p class="omatch">${chip(c.a)}${escH(teamOf(c.a).name)} <b>vs</b> ${chip(c.b)}${escH(teamOf(c.b).name)} <span class="sub">· ${c.f} vs ${c.f} · ${Math.round(c.d/60)} min${c.cap?' · a '+c.cap+' puntos':''}</span></p>`}
 <div class="oteams">${team(0)}${team(1)}</div>
 <div class="orow obtns">${myA?'<button class="btn-cont" id="onSwitch">CAMBIAR DE EQUIPO</button>':''}${NET.host?'<button class="btn-cont" id="onShuffle">MEZCLAR EQUIPOS</button>':''}${myA?'<button class="btn-cont" id="onWatch">SOLO MIRAR</button>':''}</div>
 <p class="owatch"><span class="sub">Mirando:</span> ${watchers.length?watchers.map(p=>{const nm=p.peer===NET.me?(nick||'Vos'):nameOf(p);return`<span class="ochipn">${avatar(nm,p.peer===NET.me?'#3fd8ff':peerCol(p.peer))}${escH(nm)}${p.peer===NET.me?' (vos)':''}</span>`;}).join(''):'<span class="sub">nadie</span>'}</p>
 ${NET.host?`<button class="play" id="onStart">EMPEZAR PARTIDO</button><p class="small-note">Dejá esta pestaña a la vista mientras juegan: el partido corre en tu navegador. Los lugares libres los juega la CPU.</p>`:`<p class="onote">${hp&&hp.presence.st==='play'?'Hay un partido en juego: entrás en el próximo.':'Esperando que '+escH(hostName)+' empiece el partido…'}</p>`}
 <div id="onChatSlot"></div>`;
 $('onLeave').onclick=()=>leaveSala();
 const cp=$('onCopy');if(cp)cp.onclick=()=>copyText(link,cp);
 el.querySelectorAll('.ocard.cpu').forEach(b=>b.onclick=()=>{const t=+b.dataset.t,tm=teamOf(t===0?c.a:c.b);let k=b.dataset.k==='f'?null:-1;
  if(k==null){const used=new Set(Object.values(NET.asg).filter(a=>a.t===t).map(a=>a.k));k=[...tm.players.keys()].find(i=>!used.has(i));if(k==null)return;}
  NET.want={t,k};NET.at=Date.now();pushMine();renderOnline(true);});
 for(const t of [0,1]){const pk=$('onPick'+t);if(pk)pk.onchange=()=>{NET.want={t,k:+pk.value};NET.at=NET.at||Date.now();pushMine();renderOnline(true);};}
 const wb=$('onWatch');if(wb)wb.onclick=()=>{NET.want={t:-1,k:0};pushMine();renderOnline(true);};
 if(NET.host){
  const upd=()=>{NET.asg=computeAsg();pushMine();renderOnline(true);};
  const d=el.querySelector('.ocfgd');if(d)d.ontoggle=()=>{NET.cfgOpen=d.open;};
  $('onA').onchange=e=>{c.a=e.target.value;upd();};$('onB').onchange=e=>{c.b=e.target.value;upd();};
  seg($('onF'),[[1,'1 vs 1'],[2,'2 vs 2'],[3,'3 vs 3']],()=>c.f,v=>{c.f=v;setTimeout(upd);});
  seg($('onD'),[[120,'2 min'],[180,'3 min'],[240,'4 min'],[300,'5 min']],()=>c.d,v=>{c.d=v;setTimeout(upd);});
  seg($('onCap'),[[11,'11 puntos'],[21,'21 puntos'],[0,'sin límite']],()=>c.cap,v=>{c.cap=v;setTimeout(upd);});
  $('onStart').onclick=()=>netStart();
  const sh=$('onShuffle');if(sh)sh.onclick=()=>netShuffle();
 }
 const sw=$('onSwitch');if(sw)sw.onclick=()=>netSwitchTeam();
 const slot=$('onChatSlot');if(slot)slot.appendChild(chatBox());
}
function lobbySalas(){
 const L=NET.lobbyPeers.filter(p=>p.presence&&p.presence.sala&&p.presence.sala.c&&!(p.isMe&&p.sameTab));
 return L.sort((a,b)=>(a.presence.sala.s==='jugando')-(b.presence.sala.s==='jugando'));
}

/* ===================== MODO CARRERA =====================
   Creás tu jugador, jugás partidos con tu equipo (vos sos P1, el resto la CPU), ganás experiencia,
   subís de nivel, repartís puntos en tus estadísticas y te llegan ofertas de otros equipos. */
let SPORT={kind:'futbol',statNames:['VEL','ACE','TIR','CON','FUE'],
 xp:(q,won,draw)=>60+(q.g||0)*60+(q.a||0)*35+(q.tk||0)*10+(q.sh||0)*5+(q.sv||0)*15+(won?60:draw?25:0),
 line:q=>`${q.g||0} goles · ${q.a||0} asistencias`,tot:['goles','asistencias']};
function careerKit_fut(t,pl){return t.kit;}
const CAREER_LS=()=>(SPORT.kind==='futbol'?'picadito':'triple')+'-career-v1';
let career=null;
function saveCareer(){try{if(career)localStorage.setItem(CAREER_LS(),JSON.stringify(career));else localStorage.removeItem(CAREER_LS());}catch(e){}}
const XP_NEED=l=>250+l*100;
let careerDraft=null;
function cseg(el,opts,get,set){el.innerHTML='';for(const[v,label]of opts){const b=document.createElement('button');b.type='button';b.innerHTML=label;b.setAttribute('aria-pressed',String(get()===v));b.onclick=()=>set(v);el.appendChild(b);}}
function careerPlayer(){return{n:career.name,num:career.num,st:career.st.slice(),skin:career.skin,hair:HAIR[career.hair]||HAIR.n};}
function pickRival(){const pool=TEAMS.filter(t=>t.id!==career.team);return pool[Math.floor(Math.random()*pool.length)].id;}
function teamRat(id){const t=teamOf(id);const top=t.players.map(p=>p.st.reduce((a,b)=>a+b,0)/5).sort((a,b)=>b-a).slice(0,3);return top.reduce((a,b)=>a+b,0)/top.length;}
function careerRating(){return Math.round(career.st.reduce((a,b)=>a+b,0)/5);}
function startCareerMatch(){
 if(!career.next||career.next===career.team)career.next=pickRival();saveCareer();
 const cfg={format:career.fmt||2,duration:setup.duration,cap:0,equal:false,diff:setup.diff,tie:'golden',replays:setup.replays,fouls:setup.fouls,
  sides:[{team:career.team,player:0,ctrl:'P1',kit:'auto'},{team:career.next,player:0,ctrl:'CPU',kit:'auto'}],cp:careerPlayer(),career:true};
 startMatch(cfg);
}
// después del partido: experiencia, nivel, ofertas
function careerAfterMatch(){
 if(!game||!game.cfg||!game.cfg.career||game.careerDone||!career)return;
 game.careerDone=true;
 const s=game.state,me=s.players.find(p=>p.team===0&&p.name===career.name);
 const q=(game.ps&&me&&game.ps[me.id])||{};
 const won=s.score[0]>s.score[1],draw=s.score[0]===s.score[1];
 const xp=Math.round(SPORT.xp(q,won,draw));
 const S=career.season||(career.season={pj:0,w:0,d:0,l:0,g:0,a:0});
 S.pj++;if(won)S.w++;else if(draw)S.d++;else S.l++;S.g+=q.g||0;S.a+=q.a||0;
 career.xp+=xp;let lvUp=0;
 while(career.xp>=XP_NEED(career.lvl)){career.xp-=XP_NEED(career.lvl);career.lvl++;career.pts+=3;lvUp++;}
 const opp=teamOf(career.next);
 career.log.unshift(`${won?'G':draw?'E':'P'} ${s.score[0]}-${s.score[1]} vs ${opp.name} · ${SPORT.line(q)} · +${xp} XP`);career.log=career.log.slice(0,8);
 // ofertas: jugar bien hace que te llamen equipos más fuertes
 const news=[];
 const ch=Math.min(0.65,Math.max(0.12,(xp-90)/320));
 career.offers=(career.offers||[]).filter(o=>o.until>S.pj);
 if(Math.random()<ch&&career.offers.length<3){
  const mine=teamRat(career.team),pool=TEAMS.filter(t=>t.id!==career.team&&!career.offers.some(o=>o.team===t.id)&&teamRat(t.id)>=mine-2);
  const t=(pool.length?pool:TEAMS.filter(t=>t.id!==career.team))[Math.floor(Math.random()*(pool.length||TEAMS.length-1))];
  if(t){career.offers.push({team:t.id,until:S.pj+3});news.push(t.name);}
 }
 career.next=pickRival();saveCareer();
 const box=$('endCareer');
 if(box){box.hidden=false;
  box.innerHTML=`<p class="ec-t">TU CARRERA · ${escH(career.name)}</p><p>+${xp} XP · nivel ${career.lvl}${lvUp?` <b>¡SUBISTE DE NIVEL! +${3*lvUp} puntos para repartir</b>`:''}</p>
   <div class="xpbar"><i style="width:${Math.round(career.xp/XP_NEED(career.lvl)*100)}%"></i></div>${news.length?`<p class="ec-off">📩 Oferta de ${escH(news.join(', '))}</p>`:''}`;}
 $('btnRematch').textContent='Seguir la carrera';
}
function renderCareer(){
 const el=$('career');if(!el)return;
 if(!career){
  const d=careerDraft||(careerDraft={name:myNick()||'',num:10,skin:0,hair:'n',team:TEAMS[0].id,fmt:2,pts:6,st:[68,68,68,68,68]});
  const t=teamOf(d.team);
  el.innerHTML=`<p class="label">Modo carrera</p>
  <div class="cgrid">
   <div class="cbox"><p class="label">Tu jugador</p>
    <div class="kit-stage"><canvas id="cKit" width="64" height="36"></canvas></div>
    <label class="olab">Nombre<input id="cName" maxlength="16" value="${escH(d.name)}" placeholder="Tu nombre"></label>
    <label class="olab">Número<input id="cNum" type="number" min="0" max="99" value="${d.num}"></label>
    <p class="label">Piel</p><div class="seg" id="cSkin"></div>
    <p class="label">Pelo</p><div class="seg" id="cHair"></div></div>
   <div class="cbox"><p class="label">Estadísticas iniciales · te quedan <b>${d.pts}</b> puntos</p>
    <div class="cstats">${d.st.map((v,i)=>`<span>${SPORT.statNames[i]}</span><span class="bar"><i style="width:${(v-40)/60*100}%"></i></span><span class="n">${v}</span><button type="button" class="cplus" data-i="${i}"${d.pts?'':' disabled'}>+</button><button type="button" class="cminus" data-i="${i}"${v>68?'':' disabled'}>−</button>`).join('')}</div>
    <p class="small-note">Arrancás como promesa (68 en todo). Ganás experiencia en cada partido y con cada nivel tenés 3 puntos más para repartir.</p></div>
   <div class="cbox"><p class="label">Dónde arrancás</p>
    ${teamSelect('cTeam',d.team)}
    <p class="small-note">Tu equipo: ${escH(t.name)}. Vos jugás con P1 y tus compañeros son la CPU.</p>
    <p class="label">Formato de los partidos</p><div class="seg" id="cFmt"></div>
    <button class="play" id="cStart">CREAR JUGADOR</button></div>
  </div>`;
  const draw=()=>{const kc=$('cKit').getContext('2d');kc.clearRect(0,0,64,36);const pl={skin:d.skin,hair:HAIR[d.hair]||HAIR.n};const base={kit:careerKit(t,pl),skin:SKIN[d.skin],hair:HAIR[d.hair]||HAIR.n,phase:0,moving:false,num:d.num,name:d.name||'Yo'};
   drawFootballer(kc,14,33,Object.assign({view:'front'},base));drawFootballer(kc,32,33,Object.assign({view:'back'},base));drawFootballer(kc,50,33,Object.assign({view:'side',flip:false},base));};
  draw();
  $('cName').oninput=e=>{d.name=cleanTxt(e.target.value,16);draw();};$('cName').onkeydown=e=>e.stopPropagation();
  $('cNum').oninput=e=>{d.num=Math.max(0,Math.min(99,e.target.value|0));draw();};$('cNum').onkeydown=e=>e.stopPropagation();
  cseg($('cSkin'),[0,1,2,3].map(i=>[i,`<span class="cswatch" style="background:${SKIN[i]}"></span>`]),()=>d.skin,v=>{d.skin=v;renderCareer();});
  cseg($('cHair'),Object.keys(HAIR).filter(k=>k!=='x').map(k=>[k,`<span class="cswatch" style="background:${HAIR[k]}"></span>`]),()=>d.hair,v=>{d.hair=v;renderCareer();});
  cseg($('cFmt'),[[1,'1 vs 1'],[2,'2 vs 2'],[3,'3 vs 3']],()=>d.fmt,v=>{d.fmt=v;renderCareer();});
  $('cTeam').onchange=e=>{d.team=e.target.value;renderCareer();};
  el.querySelectorAll('.cplus').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(d.pts>0&&d.st[i]<99){d.st[i]++;d.pts--;renderCareer();}});
  el.querySelectorAll('.cminus').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(d.st[i]>68){d.st[i]--;d.pts++;renderCareer();}});
  $('cStart').onclick=()=>{if(!d.name){$('cName').focus();$('cName').placeholder='Poné un nombre';return;}
   career={name:d.name,num:d.num,skin:d.skin,hair:d.hair,st:d.st.slice(),xp:0,lvl:1,pts:d.pts,team:d.team,fmt:d.fmt,season:{pj:0,w:0,d:0,l:0,g:0,a:0},offers:[],log:[],next:null};
   career.next=pickRival();careerDraft=null;saveCareer();renderCareer();};
  return;
 }
 const t=teamOf(career.team),opp=teamOf(career.next||pickRival()),S=career.season;
 el.innerHTML=`<div class="ohead"><p class="label">Modo carrera</p><button class="btn-cont" id="cRetire">RETIRARSE</button></div>
 <div class="cgrid">
  <div class="cbox"><div class="cplayer"><canvas id="cKit" width="64" height="36"></canvas><div><p class="cname">${escH(career.name)} <span class="sub">#${career.num}</span></p>
   <p class="sub">${escH(t.name)} · nivel ${career.lvl} · media ${careerRating()}</p></div></div>
   <div class="xpbar"><i style="width:${Math.round(career.xp/XP_NEED(career.lvl)*100)}%"></i></div><p class="small-note">${career.xp}/${XP_NEED(career.lvl)} XP para el nivel ${career.lvl+1}</p>
   ${career.pts?`<p class="cpts">Tenés <b>${career.pts}</b> puntos para repartir</p>`:''}
   <div class="cstats">${career.st.map((v,i)=>`<span>${SPORT.statNames[i]}</span><span class="bar"><i style="width:${(v-40)/60*100}%"></i></span><span class="n">${v}</span><button type="button" class="cplus" data-i="${i}"${career.pts&&v<99?'':' disabled'}>+</button><span></span>`).join('')}</div></div>
  <div class="cbox"><p class="label">Próximo partido</p>
   <p class="cmatch">${chip(t.id)}${escH(t.name)} <b>vs</b> ${chip(opp.id)}${escH(opp.name)}</p>
   <p class="small-note">${career.fmt} vs ${career.fmt} · ${Math.round(setup.duration/60)} min · CPU ${({easy:'fácil',normal:'normal',hard:'difícil'})[setup.diff]||'normal'} (cambialo en Amistoso)</p>
   <p class="label">Formato</p><div class="seg" id="cFmt"></div>
   <button class="play" id="cPlay">JUGAR</button>
   <p class="label" style="margin-top:12px">Temporada</p>
   <p class="cseason">${S.pj} PJ · ${S.w} G · ${S.d} E · ${S.l} P · ${S.g} ${SPORT.tot[0]} · ${S.a} ${SPORT.tot[1]}</p></div>
  <div class="cbox"><p class="label">Ofertas</p>
   ${(career.offers||[]).length?career.offers.map(o=>{const ot=teamOf(o.team);return`<div class="coffer">${chip(ot.id)}<b>${escH(ot.name)}</b><span class="sub">vence en ${Math.max(1,o.until-S.pj)} partido(s)</span><button type="button" class="btn-cont" data-acc="${o.team}">FICHAR</button></div>`;}).join(''):'<p class="small-note">Todavía no te llamó nadie. Jugá bien: goles, asistencias y triunfos hacen que te busquen.</p>'}
   <p class="label" style="margin-top:12px">Últimos partidos</p>
   ${career.log.length?`<ul class="clog">${career.log.map(x=>`<li>${escH(x)}</li>`).join('')}</ul>`:'<p class="small-note">Ninguno todavía.</p>'}</div>
 </div>`;
 const kc=$('cKit').getContext('2d');const pl={skin:career.skin,hair:HAIR[career.hair]};const base={kit:careerKit(t,pl),skin:SKIN[career.skin],hair:HAIR[career.hair]||HAIR.n,phase:0,moving:false,num:career.num,name:career.name};
 drawFootballer(kc,14,33,Object.assign({view:'front'},base));drawFootballer(kc,32,33,Object.assign({view:'back'},base));drawFootballer(kc,50,33,Object.assign({view:'side',flip:false},base));
 cseg($('cFmt'),[[1,'1 vs 1'],[2,'2 vs 2'],[3,'3 vs 3']],()=>career.fmt||2,v=>{career.fmt=v;saveCareer();renderCareer();});
 el.querySelectorAll('.cplus').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(career.pts>0&&career.st[i]<99){career.st[i]++;career.pts--;saveCareer();renderCareer();}});
 el.querySelectorAll('[data-acc]').forEach(b=>b.onclick=()=>{const nt=teamOf(b.dataset.acc);career.log.unshift(`Fichaste por ${nt.name}`);career.team=nt.id;career.offers=[];career.next=pickRival();saveCareer();renderCareer();});
 $('cPlay').onclick=()=>startCareerMatch();
 const rt=$('cRetire');rt.onclick=()=>{if(rt.dataset.sure){career=null;saveCareer();renderCareer();return;}rt.dataset.sure='1';rt.textContent='¿SEGURO? TOCÁ DE NUEVO';setTimeout(()=>{if(rt.isConnected){rt.dataset.sure='';rt.textContent='RETIRARSE';}},2500);};
}

/* ===================== PERFIL Y RANKING ONLINE =====================
   Cada uno guarda su perfil en su navegador y lo muestra en las salas: el ranking es de los que están conectados. */
const PROF_LS=()=>(SPORT.kind==='futbol'?'picadito':'triple')+'-profile-v1';
let prof=null;
// se vuelve a llamar si el juego cambia de deporte (el básquet usa otras claves)
function loadCareerData(){
 try{career=JSON.parse(localStorage.getItem(CAREER_LS())||'null');}catch(e){career=null;}
 if(career&&!TEAMS.some(t=>t.id===career.team))career=null;
 try{prof=JSON.parse(localStorage.getItem(PROF_LS())||'null');}catch(e){prof=null;}
 if(!prof||typeof prof!=='object')prof={pj:0,w:0,d:0,l:0,g:0,a:0,st:0,best:0};
}
loadCareerData();
function saveProf(){try{localStorage.setItem(PROF_LS(),JSON.stringify(prof));}catch(e){}}
function profPublic(){return{n:myNick()||'Jugador',pj:prof.pj|0,w:prof.w|0,d:prof.d|0,l:prof.l|0,g:prof.g|0,best:prof.best|0,st:prof.st|0};}
function pushProf(){if(NET.room&&NET.state!=='none')try{NET.room.presence({prof:profPublic()}).catch(()=>{});}catch(e){}}
function profAfterMatch(){
 if(!game||!game.net||game.profDone)return;game.profDone=true;
 const s=game.state,id=game.myId;if(id==null||!s.players[id])return;
 const t=s.players[id].team,me=s.score[t],ot=s.score[1-t],q=(game.ps&&game.ps[id])||{};
 prof.pj++;if(me>ot){prof.w++;prof.st=Math.max(0,prof.st)+1;}else if(me===ot){prof.d++;prof.st=0;}else{prof.l++;prof.st=0;}
 prof.best=Math.max(prof.best,prof.st);prof.g+=q.g||0;prof.a+=q.a||0;saveProf();pushProf();
}
function rankRows(){
 const rows=[];const seen=new Set();
 for(const p of NET.lobbyPeers||[]){const pr=p.presence&&p.presence.prof;if(!pr||typeof pr!=='object')continue;const me=p.isMe&&p.sameTab;const key=p.peer;if(seen.has(key))continue;seen.add(key);
  rows.push({me,n:cleanTxt(me?(myNick()||pr.n):pr.n,18)||'Jugador',pj:pr.pj|0,w:pr.w|0,d:pr.d|0,l:pr.l|0,g:pr.g|0,best:pr.best|0});}
 if(!rows.some(r=>r.me)){const pp=profPublic();rows.push(Object.assign({me:true},pp));}
 rows.sort((a,b)=>(b.w*3+b.d)-(a.w*3+a.d)||b.g-a.g||a.pj-b.pj);
 return rows.slice(0,10);
}
function rankHTML(){
 const r=rankRows();
 return`<table class="orank"><tr><th>#</th><th>Jugador</th><td>PJ</td><td>G</td><td>E</td><td>P</td><td>${SPORT.kind==='futbol'?'Goles':'Pts'}</td><td>Racha</td></tr>${r.map((x,i)=>`<tr class="${x.me?'me':''}"><td>${i+1}</td><th>${escH(x.n)}${x.me?' (vos)':''}</th><td>${x.pj}</td><td>${x.w}</td><td>${x.d}</td><td>${x.l}</td><td>${x.g}</td><td>${x.best}</td></tr>`).join('')}</table>`;
}

/* ===================== CLIMA Y HORARIO =====================
   Solo afecta la pelota y el piso en el fútbol (lluvia: la pelota patina; nieve: frena), el resto es visual. */
const wx={rain:[],snow:[]};
function pickWeather(cfg){
 const opts=SPORT.kind==='futbol'?['dia','dia','noche','lluvia','nieve']:['normal','normal','show'];
 let w=(cfg&&cfg.weather)||setup.weather||'auto';if(w==='auto')w=opts[Math.floor(Math.random()*opts.length)];return w;
}
function drawWeather(c,dt,s){
 const w=game.weather;if(!w||w==='dia'||w==='normal')return;
 const L2=s.L/2,W2=s.W/2,a=P(-L2,-W2),b=P(L2,W2);
 if(w==='noche'||w==='show'){
  // afuera de la cancha más oscuro que adentro (la cancha está iluminada)
  const x0=Math.round(a[0])-4,y0=Math.round(a[1])-4,x1=Math.round(b[0])+4,y1=Math.round(b[1])+4,dk=w==='show'?'rgba(4,6,18,0.62)':'rgba(6,10,32,0.55)';
  c.fillStyle=dk;c.fillRect(0,0,LW,y0);c.fillRect(0,y1,LW,LH-y1);c.fillRect(0,y0,x0,y1-y0);c.fillRect(x1,y0,LW-x1,y1-y0);
  c.fillStyle=w==='show'?'rgba(4,6,18,0.45)':'rgba(10,16,40,0.2)';c.fillRect(x0,y0,x1-x0,y1-y0);
  c.save();c.globalCompositeOperation='lighter';
  if(w==='show'){const bp=P(s.ball.x,s.ball.y,0),g=c.createRadialGradient(bp[0],bp[1],2,bp[0],bp[1],46);g.addColorStop(0,'rgba(255,240,200,0.35)');g.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=g;c.fillRect(bp[0]-50,bp[1]-50,100,100);
   const t=performance.now()/1000;for(let i=0;i<3;i++){const x=LW*(0.25+0.25*i)+Math.sin(t*0.7+i*2)*60,y=LH*0.5+Math.cos(t*0.9+i)*30,col=['rgba(255,80,160,0.12)','rgba(80,200,255,0.12)','rgba(255,220,80,0.12)'][i],g2=c.createRadialGradient(x,y,2,x,y,40);g2.addColorStop(0,col);g2.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g2;c.fillRect(x-40,y-40,80,80);}}
  else{c.fillStyle='rgba(255,250,220,0.06)';c.fillRect(Math.round(a[0]),Math.round(a[1]),Math.round(b[0]-a[0]),Math.round(b[1]-a[1]));
   for(const [x,y] of [[a[0]-8,a[1]-30],[b[0]+8,a[1]-30],[a[0]-8,b[1]+16],[b[0]+8,b[1]+16]]){const g=c.createRadialGradient(x,y,1,x,y,40);g.addColorStop(0,'rgba(255,250,210,0.75)');g.addColorStop(0.15,'rgba(255,250,210,0.25)');g.addColorStop(1,'rgba(255,250,210,0)');c.fillStyle=g;c.fillRect(x-40,y-40,80,80);}}
  c.restore();return;
 }
 if(w==='lluvia'){
  c.fillStyle='rgba(30,45,75,0.28)';c.fillRect(0,0,LW,LH);
  while(wx.rain.length<260)wx.rain.push({x:Math.random()*LW,y:Math.random()*LH,v:150+Math.random()*80});
  c.fillStyle='rgba(205,225,255,0.75)';
  for(const r of wx.rain){r.y+=r.v*dt;r.x-=r.v*dt*0.25;if(r.y>LH||r.x<0){r.y=-4;r.x=Math.random()*LW*1.2;}c.fillRect(Math.round(r.x),Math.round(r.y),1,4);
   if(Math.random()<0.05&&r.x>a[0]&&r.x<b[0]&&r.y>a[1]&&r.y<b[1]){c.fillRect(Math.round(r.x)-1,Math.round(r.y)+3,3,1);}}
  // charcos que brillan
  c.fillStyle='rgba(200,225,255,0.08)';for(let i=0;i<6;i++){const q=P(-L2+((i*7.3)%s.L),-W2+((i*4.1)%s.W));c.fillRect(Math.round(q[0]),Math.round(q[1]),9,2);}
  return;
 }
 if(w==='nieve'){
  c.fillStyle='rgba(255,255,255,0.26)';c.fillRect(Math.round(a[0]),Math.round(a[1]),Math.round(b[0]-a[0]),Math.round(b[1]-a[1]));
  c.fillStyle='rgba(230,235,245,0.1)';c.fillRect(0,0,LW,LH);
  while(wx.snow.length<200)wx.snow.push({x:Math.random()*LW,y:Math.random()*LH,v:12+Math.random()*16,p:Math.random()*6});
  for(const f of wx.snow){f.y+=f.v*dt;f.p+=dt;f.x+=Math.sin(f.p*1.7)*6*dt;if(f.y>LH){f.y=-2;f.x=Math.random()*LW;}c.fillStyle=f.v>22?'#ffffff':'rgba(255,255,255,0.7)';c.fillRect(Math.round(f.x),Math.round(f.y),f.v>22?2:1,f.v>22?2:1);}
 }
}

$('btnPlay').onclick=()=>{if(setup.mode==='torneo'){tour=newTour(setup.tourType,setup.tsel.team,setup.tsel.kit,setup.tsel.player);saveTour();save();startDemo();showTour();}else startMatch();};
/* ===================== GIF DEL GOL =====================
   Se vuelve a dibujar la repetición cuadro por cuadro y se arma un GIF animado (codificador propio, LZW). */
function gifLZW(px,minCode,out){
 out.byte(minCode);
 const clear=1<<minCode,eoi=clear+1;let size=minCode+1,next=eoi+1,dict=new Map(),cur=px[0],bb=0,bc=0;const bytes=[];
 const emit=c=>{bb|=c<<bc;bc+=size;while(bc>=8){bytes.push(bb&255);bb>>>=8;bc-=8;}};
 emit(clear);
 for(let i=1;i<px.length;i++){const k=px[i],key=(cur<<8)|k,v=dict.get(key);
  if(v!==undefined){cur=v;continue;}
  emit(cur);
  if(next===4096){emit(clear);next=eoi+1;size=minCode+1;dict=new Map();}
  else{if(next>=(1<<size))size++;dict.set(key,next++);}
  cur=k;}
 emit(cur);emit(eoi);if(bc>0)bytes.push(bb&255);
 for(let i=0;i<bytes.length;i+=255){const n=Math.min(255,bytes.length-i);out.byte(n);for(let j=0;j<n;j++)out.byte(bytes[i+j]);}
 out.byte(0);
}
function gifEncode(w,h,frames,pal,delay){
 let buf=new Uint8Array(1<<20),n=0;
 const out={byte(v){if(n>=buf.length){const nb=new Uint8Array(buf.length*2);nb.set(buf);buf=nb;}buf[n++]=v;}};
 const w16=v=>{out.byte(v&255);out.byte((v>>8)&255);},str=s=>{for(const c of s)out.byte(c.charCodeAt(0));};
 str('GIF89a');w16(w);w16(h);out.byte(0xF7);out.byte(0);out.byte(0);
 for(let i=0;i<256;i++){const c=pal[i]||[0,0,0];out.byte(c[0]);out.byte(c[1]);out.byte(c[2]);}
 out.byte(0x21);out.byte(0xFF);out.byte(11);str('NETSCAPE2.0');out.byte(3);out.byte(1);w16(0);out.byte(0);
 for(const fr of frames){out.byte(0x21);out.byte(0xF9);out.byte(4);out.byte(0);w16(delay);out.byte(0);out.byte(0);
  out.byte(0x2C);w16(0);w16(0);w16(w);w16(h);out.byte(0);gifLZW(fr,8,out);}
 out.byte(0x3B);return buf.slice(0,n);
}
// paleta: los 256 colores más usados (en 5 bits por canal); el resto va al más parecido
function gifPalette(imgs){
 const cnt=new Map();
 for(const d of imgs)for(let i=0;i<d.length;i+=4*3){const k=((d[i]>>3)<<10)|((d[i+1]>>3)<<5)|(d[i+2]>>3);cnt.set(k,(cnt.get(k)||0)+1);}
 const top=[...cnt.entries()].sort((a,b)=>b[1]-a[1]).slice(0,256).map(([k])=>[((k>>10)&31)*8+4,((k>>5)&31)*8+4,(k&31)*8+4]);
 return top;
}
async function exportGoalGif(){
 const g0=game;if(!g0||!g0.lastGoal||g0.exporting)return;
 const LG=g0.lastGoal,frames=LG.frames;if(!frames||frames.length<10)return;
 g0.exporting=true;const keepReplay=g0.replay;
 const note=$('gifNote');const say=t=>{for(const el of document.querySelectorAll('.gif-note'))el.textContent=t;};
 say('Generando el GIF…');
 try{
  const cams=[1.7,1,1.35,2.1],cm=(setup.rcam|0)%4,z=cams[cm];
  const sw=Math.round(LW/z),shh=Math.round(LH/z),scl=Math.max(1,Math.round(480/sw)),W=sw*scl,H=shh*scl;
  const idx=[],raw=[],rep={frames,t:0,age:0,caption:LG.caption||''};g0.replay=rep;
  let cx=null,cy=null;
  for(let i=0;i<frames.length;i+=2){
   rep.t=i;render(1/30);
   const f=frames[i],[bxp,byp]=P(f.b.x,f.b.y,0);let tx=bxp,ty=byp;
   if(cm===2){cx=cx==null?bxp:cx+(bxp-cx)*0.16;cy=cy==null?byp:cy+(byp-cy)*0.16;tx=cx;ty=cy;}
   if(cm===3){const gp=P(LG.side*game.state.L/2,0,0);tx=gp[0]*0.65+bxp*0.35;ty=gp[1]*0.6+byp*0.4;}
   const x0=Math.round(SIM.clamp(tx-sw/2,0,LW-sw)),y0=Math.round(SIM.clamp(ty-shh/2,0,LH-shh));
   raw.push(bx.getImageData(x0,y0,sw,shh).data);
   if(i%20===0){say('Generando el GIF… '+Math.round(i/frames.length*100)+'%');await new Promise(r=>setTimeout(r,0));}
  }
  const pal=gifPalette(raw.filter((_,i)=>i%4===0)),cache=new Map();
  const near=(r,gg,b)=>{const key=(r<<16)|(gg<<8)|b;let v=cache.get(key);if(v!==undefined)return v;let bd=1e9;v=0;for(let i=0;i<pal.length;i++){const c=pal[i],d=(c[0]-r)**2*3+(c[1]-gg)**2*4+(c[2]-b)**2*2;if(d<bd){bd=d;v=i;}}cache.set(key,v);return v;};
  for(const d of raw){const px=new Uint8Array(W*H);
   for(let y=0;y<shh;y++)for(let x=0;x<sw;x++){const i=(y*sw+x)*4,v=near(d[i],d[i+1],d[i+2]);for(let yy=0;yy<scl;yy++){const row=(y*scl+yy)*W+x*scl;for(let xx=0;xx<scl;xx++)px[row+xx]=v;}}
   idx.push(px);}
  say('Armando el archivo…');await new Promise(r=>setTimeout(r,0));
  const bytes=gifEncode(W,H,idx,pal,4),blob=new Blob([bytes],{type:'image/gif'});
  const name='gol-'+(LG.caption||'picadito').toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40)+'.gif';
  let saved=false;
  if(window.claude&&window.claude.use){const dl=await window.claude.use('downloads').catch(()=>null);
   if(dl){try{await dl.save({filename:name,data:blob});saved=true;say('GIF listo');}catch(e){say(e&&e.code==='declined'?'Descarga cancelada':'No se pudo guardar el GIF acá');saved=true;}}}
  if(!saved){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},4000);say('GIF descargado ('+Math.round(bytes.length/1024)+' KB)');}
 }catch(e){console.error(e);say('No se pudo generar el GIF');}
 finally{g0.replay=keepReplay;g0.exporting=false;}
}

$('btnGif').onclick=()=>exportGoalGif();$('btnGif2').onclick=()=>exportGoalGif();
$('btnResume').onclick=()=>togglePause();
$('btnRestart').onclick=()=>{startMatch(game.cfg,game.tourMatch);};
$('btnMenu').onclick=()=>{if(game&&game.net){netBackToSala();return;}const t=game&&game.tourMatch;startDemo();if(t)showTour();else{showScreen('menu');renderMenu();}};
$('btnRematch').onclick=()=>{if(game&&game.cfg&&game.cfg.career&&!game.net){startDemo();showScreen('menu');setup.mode='carrera';renderMenu();return;}if(game&&game.net){if(NET.host)netStart();return;}if(game&&game.tourMatch){startDemo();showTour();}else startMatch();};
$('btnEndMenu').onclick=()=>{if(game&&game.net){netBackToSala();return;}showScreen('menu');renderMenu();startDemo();};
$('btnTourMenu').onclick=()=>{showScreen('menu');renderMenu();};
addEventListener('keydown',e=>{if((e.code==='KeyC'||e.key==='c'||e.key==='C')&&!e.repeat&&game&&game.replay&&!game.exporting){setup.rcam=((setup.rcam|0)+1)%4;save();}});
for(const el of [screen,document.getElementById('tzone')])if(el)el.addEventListener('pointerdown',()=>{if(game&&game.replay&&!game.exporting){setup.rcam=((setup.rcam|0)+1)%4;save();}});
addEventListener('keydown',e=>{if(e.code==='Enter'&&!$('menu').hidden&&setup.mode!=='online'&&document.activeElement===document.body)startMatch();});
/* ===================== BÁSQUET: cancha, aros, pelota, avisos y estadísticas =====================
   Estas funciones reemplazan a las del fútbol (en JavaScript, la última declaración con el mismo nombre es la que vale). */
const hoopFx={'-1':0,'1':0};
SPORT={kind:'basquet',statNames:['VEL','TIR','TRI','DEF','REB'],dust:'235,205,160',wxLabel:'Ambiente',wxOpts:[['auto','Al azar'],['normal','Normal'],['show','Show de luces']],
 xp:(q,won)=>60+(q.g||0)*8+(q.a||0)*15+(q.r||0)*8+(q.stl||0)*15+(q.blk||0)*15+(won?60:0),
 line:q=>`${q.g||0} pts · ${q.a||0} ast · ${q.r||0} reb`,tot:['puntos','asistencias']};
loadCareerData();
function stadiumOf(t){return SD(String(t.city||t.name).toUpperCase(),'',{seats:[t.kit.p,t.kit.s===t.kit.p?'#F4F4F2':t.kit.s],tiers:2,band:'palcos',roof:'ring',roofCol:'#2b3038',shape:'bowl',lights:'roof',endL:'curve',endR:'curve'});}
function chantStyle(){return'eur';}
function maxHumans(f){return f;}
function careerKit(t,pl){return bkit(t.kit,pl);}
function buildPitch(s,kits){
 const c=document.createElement('canvas');c.width=LW;c.height=LH;const g=c.getContext('2d');
 const L2=s.L/2,W2=s.W/2;
 g.fillStyle='#0e1813';g.fillRect(0,0,LW,LH);
 const topEdge=P(0,-W2-0.5,1.1)[1],botEdge=P(0,W2+0.5,0)[1];
 const STD=game?game.stadium:stadiumOf(TEAMS[0]);
 const xInL=Math.floor(P(-L2-SIM.GD-0.6,0)[0])-3,xInR=Math.ceil(P(L2+SIM.GD+0.6,0)[0])+3;
 drawStadium(g,STD,kits,topEdge,botEdge,LW,LH,xInL,xInR);
 // parquet
 const fill=(x0,y0,x1,y1,col)=>{const a=P(x0,y0),b=P(x1,y1);g.fillStyle=col;g.fillRect(Math.round(a[0]),Math.round(a[1]),Math.round(b[0]-a[0]),Math.round(b[1]-a[1]));};
 fill(-L2-1.1,-W2-0.8,L2+1.1,W2+0.8,'#7a4a28');
 fill(-L2,-W2,L2,W2,'#c98c52');
 for(let y=-W2,i=0;y<W2;y+=0.42,i++){const a=P(-L2,y),b=P(L2,Math.min(W2,y+0.42));g.fillStyle=i%3===0?'#bf8349':i%3===1?'#d0955c':'#c48850';g.fillRect(Math.round(a[0]),Math.round(a[1]),Math.round(b[0]-a[0]),Math.max(1,Math.round(b[1]-a[1])));
  for(let x=-L2+((i*1.7)%3);x<L2;x+=3.1){const q=P(x,y);g.fillStyle='rgba(90,50,20,0.25)';g.fillRect(Math.round(q[0]),Math.round(q[1]),1,Math.max(1,Math.round(0.42*view.ppm*YC)));}}
 // pintura de las llaves con el color del local
 const keyCol=hexA(kits[0].p,0.78),W='rgba(250,246,236,0.95)';
 for(const sd of [-1,1]){
  const kx0=sd*L2,kx1=sd*(L2-5.8);
  const a=P(Math.min(kx0,kx1),-2.45),b=P(Math.max(kx0,kx1),2.45);g.fillStyle=keyCol;g.fillRect(Math.round(a[0]),Math.round(a[1]),Math.round(b[0]-a[0]),Math.round(b[1]-a[1]));
 }
 // círculo central con la sigla del local
 {const cc=P(0,0);const r=1.8*view.ppm,ry=r*YC;for(let yy=-Math.floor(ry);yy<=ry;yy++){const w=Math.floor(r*Math.sqrt(Math.max(0,1-(yy*yy)/(ry*ry))));g.fillStyle=hexA(kits[0].p,0.5);g.fillRect(Math.round(cc[0])-w,Math.round(cc[1])+yy,w*2+1,1);}
  pxText(g,game?game.teams[0].abbr:'',Math.round(cc[0]),Math.round(cc[1])+1,'rgba(255,255,255,0.75)','rgba(0,0,0,0.25)');}
 // líneas
 const ln=(x0,y0,x1,y1)=>pline(g,...P(x0,y0),...P(x1,y1),W);
 ln(-L2,-W2,L2,-W2);ln(-L2,W2,L2,W2);ln(-L2,-W2,-L2,W2);ln(L2,-W2,L2,W2);ln(0,-W2,0,W2);
 pellipse(g,...P(0,0),1.8*view.ppm,1.8*view.ppm*YC,W);
 for(const sd of [-1,1]){
  const hx=sd*(L2-SIM.HOOP_OFF),kx1=sd*(L2-5.8);
  ln(sd*L2,-2.45,kx1,-2.45);ln(sd*L2,2.45,kx1,2.45);ln(kx1,-2.45,kx1,2.45);
  // círculo de tiro libre
  let lp=null;for(let i=0;i<=24;i++){const a=-Math.PI/2+i/24*Math.PI,q=P(kx1-sd*Math.cos(a)*1.8,Math.sin(a)*1.8);if(lp)pline(g,...lp,...q,W);lp=q;}
  // línea de triple: rectas en las esquinas y arco
  const yc=W2-0.9,R3=s.R3;
  const ang=Math.asin(Math.min(1,yc/R3)),xa=hx-sd*Math.cos(ang)*R3;
  ln(sd*L2,-yc,xa,-yc);ln(sd*L2,yc,xa,yc);
  lp=null;for(let i=0;i<=40;i++){const a=-ang+i/40*2*ang,q=P(hx-sd*Math.cos(a)*R3,Math.sin(a)*R3);if(lp)pline(g,...lp,...q,W);lp=q;}
  // semicírculo bajo el aro
  lp=null;for(let i=0;i<=12;i++){const a=-Math.PI/2+i/12*Math.PI,q=P(hx-sd*Math.cos(a)*1.25,Math.sin(a)*1.25);if(lp)pline(g,...lp,...q,'rgba(250,246,236,0.6)');lp=q;}
 }
 // carteles de la tribuna (fila de atrás)
 const ads=['TRIPLE PIXEL','FERNET 1882','CHORI & PAN','MATE COCIDO','EL POTRERO','ASADO FC'];
 const adCols=[['#c8102e','#fff'],['#0b3d91','#ffd400'],['#1f1f1f','#7cfc00'],['#f2a900','#1a1a1a'],['#ffffff','#0b3d91'],['#5b2a86','#ffffff']];
 g.font='8px Silkscreen, monospace';g.textBaseline='middle';
 {const y=-W2-0.85,[x0,yt]=P(-L2-1.2,y,0.8),[x1,yb]=P(L2+1.2,y,0);const w=x1-x0,h=Math.max(6,yb-yt),n=6;
  for(let i=0;i<n;i++){const xa=Math.round(x0+w*i/n),xb=Math.round(x0+w*(i+1)/n);const[bgc,fg]=adCols[i%adCols.length];g.fillStyle=bgc;g.fillRect(xa,Math.round(yt),xb-xa,Math.round(h));g.fillStyle='rgba(0,0,0,.35)';g.fillRect(xa,Math.round(yt+h)-1,xb-xa,1);g.fillStyle=fg;g.textAlign='center';g.fillText(ads[i%ads.length],Math.round((xa+xb)/2),Math.round(yt+h/2)+1);}}
 return c;
}
function drawGoalBack(){}
function drawGoalFrames(){}
function updateNets(dt){for(const k in hoopFx)if(hoopFx[k]>0)hoopFx[k]=Math.max(0,hoopFx[k]-dt*1.6);}
function netHit(){}
function resetNets(){hoopFx['-1']=0;hoopFx['1']=0;}
function drawLanding(){}
function drawAim(){}
// aro: poste acolchado, brazo, tablero (de canto), aro naranja y red
function drawHoop(c,s,sd){
 const L2=s.L/2,bxw=sd*(L2-SIM.BOARD_OFF),hx=sd*(L2-SIM.HOOP_OFF),RH=SIM.RIM_H;
 const pad=game.kits[sd<0?0:1].p;
 const base=P(sd*(L2+1.0),0,0),top=P(sd*(L2+1.0),0,3.35),arm=P(bxw+sd*0.15,0,3.35);
 c.fillStyle='rgba(0,0,0,0.3)';c.fillRect(Math.round(base[0])-4,Math.round(base[1]),9,2);
 c.fillStyle=pad;c.fillRect(Math.round(base[0])-3,Math.round(base[1])-6,7,6);c.fillStyle=sh(pad,-0.3);c.fillRect(Math.round(base[0])+(sd>0?2:-3),Math.round(base[1])-6,2,6);
 c.fillStyle='#3a3f47';c.fillRect(Math.round(top[0])-1,Math.round(top[1]),2,Math.round(base[1]-top[1])-6);
 pline(c,top[0],top[1],arm[0],arm[1],'#3a3f47');pline(c,top[0],top[1]+1,arm[0],arm[1]+1,'#2a2e34');
 // tablero
 const bt=P(bxw,0,3.95),bb=P(bxw,0,2.9),ry=Math.round(0.9*view.ppm*YC);
 const xb=Math.round(bt[0]),yt=Math.round(bt[1])-ry,yb=Math.round(bb[1])+ry;
 const w=3,x0=sd>0?xb-1:xb-w+1;
 c.fillStyle='rgba(235,240,245,0.92)';c.fillRect(x0,yt,w,yb-yt);
 c.fillStyle='#1b1d22';c.fillRect(x0,yt,w,1);c.fillRect(x0,yb-1,w,1);c.fillRect(sd>0?x0+w-1:x0,yt,1,yb-yt);
 const sq=P(bxw,0,3.25);c.fillStyle='#e8562a';c.fillRect(x0,Math.round(sq[1])-3,w,1);c.fillRect(x0,Math.round(sq[1])+3,w,1);
 // aro y red
 const rc=P(hx,0,RH),rx=Math.max(3,Math.round(SIM.RIM_R*view.ppm)),rr=Math.max(2,Math.round(rx*YC));
 pline(c,rc[0]+sd*rx,rc[1],xb,rc[1],'#c84a1c');
 const f=hoopFx[String(sd)]||0,nh=Math.round(0.45*view.ppm*ZC*(1+f*0.6));
 for(let i=0;i<=4;i++){const t=i/4,xt=rc[0]-rx+t*2*rx,xbn=rc[0]-rx*0.55+t*rx*1.1+Math.sin(performance.now()/60+i)*f*1.5;
  pline(c,xt,rc[1]+1,xbn,rc[1]+nh,'rgba(245,245,240,0.85)');}
 for(let k=1;k<=2;k++){const yy=rc[1]+Math.round(nh*k/3),ww=Math.round(rx*(1-0.22*k));c.fillStyle='rgba(245,245,240,0.6)';for(let xx=-ww;xx<=ww;xx+=2)c.fillRect(Math.round(rc[0])+xx,yy,1,1);}
 const shk=f>1?Math.round(Math.sin(performance.now()/25)*1.4):0;
 ringPx(c,rc[0],rc[1]+shk,rx,rr,'#ff6a1f',false);ringPx(c,rc[0],rc[1]+1+shk,rx,rr,'#b8420f',false,0.25,0.75);
}
const BB=['.##.','####','####','.##.'];
function drawBall(c,b){
 const[gx,gy]=P(b.x,b.y,0);const a=Math.max(0.12,0.42-b.z*0.06);
 c.fillStyle=`rgba(0,0,0,${a})`;c.fillRect(Math.round(gx)-2,Math.round(gy),4,1);
 const[x,y]=P(b.x,b.y,b.z),ox=Math.round(x)-2,oy=Math.round(y)-3;
 const fr=Math.floor((b.roll||0)*2)%4;
 for(let r=0;r<4;r++)for(let q=0;q<4;q++){if(BB[r][q]!=='#')continue;let col=(r===0||q===0)?'#ff9d4a':'#e8701f';if(r===3||q===3)col='#b9520f';
  if((fr%2===0&&q===1+(fr>>1))||(fr%2===1&&r===1+(fr>>1)))col='#3a1a08';c.fillStyle=col;c.fillRect(ox+q,oy+r,1,1);}
}
function snap(s){return{b:{x:s.ball.x,y:s.ball.y,z:s.ball.z,roll:s.ball.roll,vx:s.ball.vx,vy:s.ball.vy,holder:-1},p:s.players.map(p=>[p.x,p.y,p.face,p.run,p.vx,p.vy,null,0,p.kickAnim,0,1,p.stunT,p.skill?{type:p.skill.type,t:p.skill.t,dur:p.skill.dur}:null,p.jz,p.shootT,p.swipeT,p.dunkT])};}
function snapScene(f){
 const s=game.state;
 const players=s.players.map((p,i)=>{const a=f.p[i],o=Object.create(p);o.x=a[0];o.y=a[1];o.face=a[2];o.run=a[3];o.vx=a[4];o.vy=a[5];o.dive=null;o.diveT=0;o.kickAnim=a[8];o.slideT=0;o.slideDx=1;o.stunT=a[11];o.skill=a[12]||null;o.jz=a[13]||0;o.shootT=a[14]||0;o.swipeT=a[15]||0;o.dunkT=a[16]||0;o.charging=false;o.pressing=false;return o;});
 return{players,ball:f.b,replay:true};
}
// musculosa: los brazos van con el color de la piel
function bkit(k,p){const sk=SKIN[p.skin|0];return Object.assign({},k,{sleeve:sk,socks:'#F4F4F2'});}
function sfx(e){
 if(e.t==='steal'){tone(320,160,0.07,'square',0.07);return;}
 if(game&&game.demo&&e.t!=='drib')return;
 switch(e.t){
  case'drib':if(!game||game.demo)break;tone(120,70,0.045,'sine',0.07);break;
  case'kick':if(e.shot)noise(0.08,0.07,1800);else tone(260,180,0.05,'sine',0.06);break;
  case'rim':tone(640,520,0.22,'square',0.07);noise(0.06,0.1,2600);break;
  case'board':tone(210,140,0.09,'square',0.08);break;
  case'bounce':if(e.v>1.5)tone(130,80,0.05,'sine',Math.min(0.12,e.v/40));break;
  case'block':tone(170,80,0.14,'square',0.12);noise(0.06,0.12,800);break;
  case'whistle':tone(2100,2050,0.18,'triangle',0.09);break;
  case'skill':noise(0.1,0.08,2200);break;
  case'shotclock':tone(220,220,0.6,'sawtooth',0.07);break;
  case'goal':noise(0.3,0.18,3200);setTimeout(()=>{tone(523,523,0.12,'square',0.06);setTimeout(()=>tone(784,784,0.25,'square',0.06),120);},120);break;
  case'end':tone(220,220,1.0,'sawtooth',0.08);break;
 }
}
function hintText(){
 if(!touch.on&&setup.mouse!==false&&setup.sides.some(sd=>sd.ctrl==='P1'))return'P1: WASD · mouse: click izquierdo tirar (soltá en verde) / saltar · click derecho pase al compañero que señalás · E alley-oop · Q robar · R giro · Shift turbo   |   Esc pausa · M sonido';
 if(touch.on&&setup.sides.some(sd=>sd.ctrl==='P1'))return'Joystick para moverte · TIRAR: mantené y soltá en la zona verde · PASE · ROBAR · GIRO · cerca del aro, TIRAR corriendo = bandeja o volcada';
 const h=[];setup.sides.forEach(sd=>{if(sd.ctrl==='P1')h.push('P1: WASD · Espacio tirar (soltá en verde) / saltar · F pase (mantené: marcar) · E alley-oop · Q robar · R giro · Shift turbo'+(setup.swap&&setup.swap!=='no'?' · C cambio':''));if(sd.ctrl==='P2')h.push('P2: Flechas · Enter tirar · Ñ pase · Shift der alley · Ctrl der robar'+(setup.swap&&setup.swap!=='no'?' · coma cambio':''));});
 h.push('Esc pausa · M sonido');return h.join('   |   ');
}
function updateHUD(){
 const s=game.state;$('scoreA').textContent=s.score[0];$('scoreB').textContent=s.score[1];
 const ck=$('clock'),scl=s.shotClock==null?'':' · '+Math.max(0,Math.ceil(s.shotClock));
 if(s.golden){ck.textContent='ORO '+fmt(s.ot)+scl;ck.classList.add('gold');}else{ck.textContent=fmt(s.clock)+scl;ck.classList.remove('gold');}
}
function handleEvents(){
 const s=game.state,st=game.stats;
 const isMe=id=>{const c=game.ctrls[id];return!!c&&c.type==='human'&&(game.net?c.peer===NET.me:c.slot===1);};
 const vib=pat=>{if(setup.vib===false||!touch.on||!navigator.vibrate)return;try{navigator.vibrate(pat);}catch(_){}};
 const PS=game.ps||(game.ps={}),ps=id=>PS[id]||(PS[id]={g:0,a:0,r:0,stl:0,blk:0,sh:0,fg:0}),TL=game.tl||(game.tl=[]);
 st.threeA=st.threeA||[0,0];st.threeM=st.threeM||[0,0];
 for(const e of s.events){
  sfx(e);
  if(game.demo)continue;
  if(e.t==='kick'&&isMe(e.id))vib(e.shot?14:8);
  else if((e.t==='steal'||e.t==='block')&&isMe(e.id))vib(30);
  else if(e.t==='goal'){const me=s.players.find(q=>isMe(q.id));if(me&&me.team===e.team)vib([60,40,120]);}
  if(e.t==='grab'&&e.id!=null&&s.players[e.id]){const last=TL[TL.length-1];if(!last||last.id!==e.id)TL.push({id:e.id,team:s.players[e.id].team,k:s.tick});if(TL.length>40)TL.shift();}
  switch(e.t){
   case'kick':
    if(e.shot&&e.ft){st.ftA=st.ftA||[0,0];st.ftA[e.team]++;if(e.perfect)popup('¡PERFECTO!',e.x,e.y,'#7dff4f');}
    else if(e.shot){st.shots[e.team]++;ps(e.id).sh++;if(e.pts===3)st.threeA[e.team]++;
     if(game.ctrls[e.id]&&game.ctrls[e.id].type==='human'){const tm=e.perfect?'PERFECTO':e.late?'TARDE':'TEMPRANO',mk=e.cont?e.cont+'% MARCADO':'LIBRE';popup(tm+' · '+mk,e.x,e.y,e.perfect?'#7dff4f':e.late?'#ff8a65':'#ffe14d');}
     else if(e.perfect)popup('¡PERFECTO!',e.x,e.y,'#7dff4f');
     crowdEvent('chance');}
    break;
   case'goal':{
    if(e.ft){ps(e.id).g+=1;st.ftM=st.ftM||[0,0];st.ftM[e.team]++;game.noReplay=true;popup('¡ADENTRO! +1',s.players[e.id].x,s.players[e.id].y,'#7dff4f');crowdEvent('chance');break;}
    game.noReplay=false;game.lastScorerId=e.id;
    const sc=e.id;if(sc!=null&&s.players[sc]){ps(sc).g+=e.pts;ps(sc).fg++;
     for(let i=TL.length-1;i>=0;i--){const q=TL[i];if(q.id===sc)continue;if(q.team===s.players[sc].team&&s.tick-q.k<60*7)ps(q.id).a++;break;}}
    TL.length=0;st.onTarget[e.team]++;if(e.pts===3)st.threeM[e.team]++;
    const big=e.alley?'¡ALLEY-OOP!':e.dunk?'¡VOLCADA!':e.pts===3?'¡TRIPLE!':e.lay?'¡BANDEJA!':'¡DOBLE!';
    const tn=game.teams[e.team].abbr;banner(big,`${e.name} · ${tn} · +${e.pts}${e.andOne?' · ¡Y FALTA!':''}`,setup.replays&&!game.net?0.9:1.6);
    fx.shake=e.dunk?0.5:e.pts===3?0.35:0.2;fx.flash=e.dunk||e.pts===3?0.5:0.25;if(e.dunk||e.pts===3)spawnConfetti(game.kits[e.team]);
    crowdEvent('goal',e.team);hudGoal(e.team);hoopFx[e.team===0?'1':'-1']=1;
    game.goalCaption=`${e.name} · ${big.replace(/[¡!]/g,'')}`;break;}
   case'golden':banner('CANASTA DE ORO','La próxima canasta gana',2);break;
   case'whistle':if(s.tick<5)crowdEvent('kickoff');break;
   case'rim':popup('¡ARO!',s.ball.x,s.ball.y,'#ffb02e');crowdEvent('chance');break;
   case'block':popup('¡TAPA!',e.x,e.y,'#ff5aa8');st.saves[e.team]++;ps(e.id).blk++;fx.shake=Math.max(fx.shake,0.25);crowdEvent('save');break;
   case'steal':popup('¡ROBO!',e.x,e.y,'#9be7ff');st.tackles[e.team]++;ps(e.id).stl++;break;
   case'rebound':st.fouls[e.team]++;ps(e.id).r++;if(e.off)popup('REBOTE',e.x,e.y,'#f3f0e2');break;
   case'shotclock':banner('POSESIÓN',`Se terminaron los ${SIM.SC} segundos`,1.4);break;
   case'skill':popup('¡GIRO!',e.x,e.y,'#ffe14d');break;
   case'foul':{const q=s.players[e.id];st.fl=st.fl||[0,0];st.fl[e.team]++;popup('¡FALTA!',e.x,e.y,'#ff5a4f');if(!e.shooting)popup(q?q.name:'',e.x,e.y+0.8,'#ffb3a8');break;}
   case'freethrow':{const q=s.players[e.id],hum=game.ctrls[e.id]&&game.ctrls[e.id].type==='human';banner(e.n===1?'TIRO LIBRE':e.n+' TIROS LIBRES',(q?q.name+' · ':'')+(hum?(touch.on?'Mantené TIRAR y soltá en verde':'Mantené tirar y soltá en verde'):game.teams[e.team].abbr),1.8);break;}
   case'fire':{const q=s.players[e.id];banner('¡EN LLAMAS!',q.name+' metió 3 seguidas',1.6);crowdEvent('goal',e.team);fx.flash=0.4;break;}
   case'fireout':{const q=s.players[e.id];popup('SE APAGÓ',q.x,q.y,'#9be7ff');break;}
   case'hang':fx.shake=Math.max(fx.shake,0.6);hoopFx[e.team===0?'1':'-1']=1.4;break;
  }
 }
 s.events.length=0;
 if(!game.demo&&s.phase==='play'){const b=s.ball,t=b.holder>=0?s.players[b.holder].team:b.lastTeam;if(t>=0)st.poss[t]++;}
}
function showEnd(){
 const s=game.state;
 let w=s.score[0]+s.agg[0]===s.score[1]+s.agg[1]?null:s.score[0]+s.agg[0]>s.score[1]+s.agg[1]?0:1;
 $('endTitle').textContent=w==null?'EMPATE':'GANÓ '+game.teams[w].abbr;
 $('endA').textContent=game.teams[0].abbr;$('endB').textContent=game.teams[1].abbr;$('endScore').textContent=s.score[0]+' - '+s.score[1];
 $('endScorers').innerHTML='';
 const st=game.stats,tp=st.poss[0]+st.poss[1]||1,pa=Math.round(st.poss[0]/tp*100);
 const row=(l,a,b2)=>`<tr><td>${a}</td><th>${l}</th><td>${b2}</td></tr>`;
 const pct=(m,a)=>a?` (${Math.round(m/a*100)}%)`:'';
 {const PS=game.ps||{},rows=[];const won=w==null?-1:w;
  for(const id in PS){const p=s.players[id];if(!p)continue;const q=PS[id];const sc=q.g+q.a*1.5+q.r*1.2+q.stl*2+q.blk*2+(p.team===won?2:0);if(q.g+q.a+q.r+q.stl+q.blk+q.sh)rows.push({p,q,sc});}
  rows.sort((a,b)=>b.sc-a.sc);
  const fig=rows[0];const fe=$('endFig');fe.hidden=!fig;
  if(fig){fe.innerHTML=`<canvas id="figCv" width="30" height="34"></canvas><div>★ MVP DEL PARTIDO ★<br><b>${escH(fig.p.name)}</b> · ${escH(game.teams[fig.p.team].abbr)}<br><span class="figline">${fig.q.g} PTS · ${fig.q.a} AST · ${fig.q.r} REB${fig.q.stl?' · '+fig.q.stl+' ROB':''}${fig.q.blk?' · '+fig.q.blk+' TAP':''}</span></div>`;
   const g=$('figCv').getContext('2d');const p=fig.p;drawFootballer(g,15,32,{kit:bkit(game.kits[p.team],p),skin:SKIN[p.skin|0],hair:p.hair||'#222',name:p.name,phase:0,moving:false,num:p.num,view:'front',armsUp:true});}
  const hum=id=>game.ctrls[id]&&game.ctrls[id].type==='human';
  $('endPlayers').innerHTML=rows.length?`<tr><th>Jugador</th><td>PTS</td><td>AST</td><td>REB</td><td>ROB</td><td>TAP</td></tr>`+rows.slice(0,8).map(r=>`<tr class="${hum(r.p.id)?'me':''}"><th>${escH(r.p.name)} <span style="color:var(--muted)">${escH(game.teams[r.p.team].abbr)}</span></th><td>${r.q.g}</td><td>${r.q.a}</td><td>${r.q.r}</td><td>${r.q.stl}</td><td>${r.q.blk}</td></tr>`).join(''):'';}
 const ta=st.threeA||[0,0],tm3=st.threeM||[0,0];
 const fl=st.fl||[0,0];
 $('endStats').innerHTML=row('Faltas',fl[0],fl[1])+row('Tiros de campo',`${st.onTarget[0]}/${st.shots[0]}${pct(st.onTarget[0],st.shots[0])}`,`${st.onTarget[1]}/${st.shots[1]}${pct(st.onTarget[1],st.shots[1])}`)+row('Triples',`${tm3[0]}/${ta[0]}`,`${tm3[1]}/${ta[1]}`)+row('Tiros libres',`${(st.ftM||[0,0])[0]}/${(st.ftA||[0,0])[0]}`,`${(st.ftM||[0,0])[1]}/${(st.ftA||[0,0])[1]}`)+row('Rebotes',st.fouls[0],st.fouls[1])+row('Robos',st.tackles[0],st.tackles[1])+row('Tapas',st.saves[0],st.saves[1])+row('Posesión',pa+'%',(100-pa)+'%');
 const tm=game.tourMatch;
 if(tm&&tour){recordUserResult(tour,tm,s.score,null);
  $('endTitle').textContent=w==null?'EMPATE':w===0?'¡GANASTE!':'PERDISTE';}
 $('btnRematch').textContent=tm?'Continuar torneo':game.net?(NET.host?'Revancha':'Esperando revancha…'):'Revancha';$('btnRematch').disabled=!!(game.net&&!NET.host);$('btnEndMenu').textContent=game.net?'Volver a la sala':'Volver al menú';
 $('endCareer').hidden=true;try{careerAfterMatch();profAfterMatch();}catch(e){console.error(e);}
 showScreen('end');$('btnRematch').focus();
}
// partido CPU vs CPU con el motor real, sin pantalla: 1 vs 1, 90 segundos
function simMatch(t,m,k){
 const r=rng(t.seed+k*7919);
 const lu=id=>{const tm=teamOf(id),off=Math.floor(r()*tm.players.length);return[{data:tm.players[off%tm.players.length]}];};
 const s=SIM.createMatch({format:1,duration:90,cap:0,equal:false,lineups:[lu(m.a),lu(m.b)],kickoffTeam:r()<0.5?0:1,seed:(t.seed+k*31)>>>0});
 const diff=id=>{const v=teamRating(teamOf(id));return v>=84?'hard':v>=80?'normal':'easy';};
 const dA=diff(m.a),dB=diff(m.b);
 let n=0;
 while(s.phase!=='end'&&n<60*240){const inp=s.players.map(p=>AI.field(s,p,p.team?dB:dA));SIM.step(s,inp);s.events.length=0;n++;}
 if(s.score[0]===s.score[1])s.score[r()<0.5?0:1]+=2;
 return[s.score[0],s.score[1]];
}
function startNetMatch(c,asg,mid,host){
 NET.lastMid=mid;NET.snaps=[];NET.lastEv=0;NET.evSeq=0;NET.evBuf=[];NET.cnt={};NET.pubTick=-1;NET.endPub=false;NET.endShown=false;NET.hostSeen=performance.now();
 const humans=[];
 for(const peer in asg){const a=asg[peer],tm=teamOf(a.t===0?c.a:c.b);if(!tm.players[a.k])continue;humans.push({team:a.t,gk:false,k:a.k,name:tm.players[a.k].n,peer});}
 const cfg={format:c.f,duration:c.d,cap:c.cap,equal:!!c.eq,diff:'normal',tie:'golden',replays:false,sides:[{team:c.a,player:0,ctrl:'CPU',kit:'auto'},{team:c.b,player:0,ctrl:'CPU',kit:'auto'}]};
 startMatch(cfg,null,{humans,host});
 netLabels();
 game.myId=null;for(const id in game.ctrls)if(game.ctrls[id].peer===NET.me)game.myId=+id;
 NET.hist=[];NET.disp=null;NET.run=0;if(NET.sala)NET.sala.presence({inm:mid}).catch(()=>{});
 const mine=humans.find(h=>h.peer===NET.me);
 $('hint').textContent=(mine?'Sos '+mine.name+' · WASD · Espacio tirar/saltar · F pase · Q robar':'Estás mirando')+' · Esc menú · Sala '+NET.code.toUpperCase();
}
// cámara un poco más cerca que en el fútbol: la cancha de básquet es más chica
function makeView(s){
 const ppm=Math.min((LW-96)/(s.L+2*SIM.GD+2.4),(LH-84)/((s.W+2.4)*YC+SIM.BAR*ZC));
 return{ppm,cx:LW/2,cy:LH/2+16};
}

// llamas alrededor del jugador "en llamas"
function drawFire(c,sx,sy,now){
 for(let i=0;i<9;i++){const a=now*11+i*1.3,h=Math.round(9+Math.sin(a)*4+Math.sin(a*2.3)*2),x=Math.round(sx-8+i*2),base=Math.round(sy)-1;
  for(let k=0;k<h;k++){const u=k/h;c.fillStyle=u<0.35?'rgba(220,40,20,0.85)':u<0.7?'rgba(255,120,30,0.85)':'rgba(255,220,70,0.9)';c.fillRect(x+((k+i)%3===0?1:0),base-k-(i%2?2:0),1,1);}}
}
// presentación de los equipos antes del partido
function showIntro(){
 const el=$('intro');if(!el||!game||game.demo||game.net)return;
 const col=t=>{const k=game.kits[t],tm=game.teams[t],ps=game.state.players.filter(p=>p.team===t);
  return`<div class="icol" style="--c:${k.p};--n:${k.num||'#fff'}"><p class="iteam">${escH(tm.name.toUpperCase())}</p><p class="icity">${escH(tm.city||'')}</p>
   ${ps.map(p=>{const hum=game.ctrls[p.id].type==='human';return`<p class="iplayer${hum?' me':''}"><span class="inum">${escH(String(p.num))}</span>${escH(p.name)}${hum?' ★':''}</p>`;}).join('')}
   <p class="ibench">Banco: ${escH(tm.players.filter(x=>!ps.some(p=>p.name===x.n)).map(x=>x.n).join(' · '))}</p></div>`;};
 el.innerHTML=`<div class="ibox">${col(0)}<div class="ivs">VS</div>${col(1)}</div><p class="iskip">${touch.on?'Tocá para empezar':'Apretá cualquier tecla o hacé click para empezar'}</p>`;
 el.hidden=false;game.introT=3.2;
}
function introTick(dt){
 const el=$('intro');if(!game||!(game.introT>0)){if(el&&!el.hidden)el.hidden=true;return false;}
 game.introT-=dt;
 if(game.introT<=0||keys.size||mouse.l||touch.held.kick||game.introSkip){game.introT=0;game.introSkip=false;el.hidden=true;keys.clear();mouse.l=false;return false;}
 return true;
}
(function(){const el=$('intro');if(el)el.addEventListener('pointerdown',e=>{e.preventDefault();if(game)game.introSkip=true;});})();
// medidor de tiro: barrita vertical al lado del jugador. Se llena de abajo hacia arriba; soltá cuando está en la franja verde.
function drawChargeRing(c,sx,sy,p){
 const H=22,Wd=4,x0=Math.round(sx)+8,y0=Math.round(sy)-27-Math.round((p.jz||0)*view.ppm*ZC);
 const [g0,g1]=SIM.PERF,ch=Math.min(1.2,p.charge),fy=v=>y0+H-Math.round(Math.min(1,v)*H);
 const inG=ch>=g0&&ch<=g1,late=ch>g1;
 c.fillStyle='#000';c.fillRect(x0-1,y0-1,Wd+2,H+2);
 c.fillStyle='#2a2f2b';c.fillRect(x0,y0,Wd,H);
 // franja verde (con marcas a los costados para verla de reojo)
 c.fillStyle=inG?'#b6ff8a':'#2f8a3c';c.fillRect(x0,fy(g1),Wd,fy(g0)-fy(g1));
 c.fillStyle='#7dff4f';c.fillRect(x0-3,fy(g1),2,1);c.fillRect(x0-3,fy(g0)-1,2,1);c.fillRect(x0+Wd+1,fy(g1),2,1);c.fillRect(x0+Wd+1,fy(g0)-1,2,1);
 // relleno
 const top=fy(ch);c.fillStyle=late?'#ff3b30':inG?'#7dff4f':'#ffe14d';c.fillRect(x0+1,top,Wd-2,y0+H-top);
 c.fillStyle='#ffffff';c.fillRect(x0-1,top,Wd+2,1);
 if(late&&Math.floor(performance.now()/90)%2){c.fillStyle='#ff3b30';c.fillRect(x0-1,y0-1,Wd+2,1);}
}
addEventListener('keydown',e=>{if(game&&game.introT>0&&!e.repeat&&e.code!=='Escape')game.introSkip=true;});
// Básquet: si sos el único humano de tu equipo, manejás siempre al que tiene la pelota (pase, rebote, robo o pelota suelta)
function passSwitch(s){
 if(setup.passSwitch===false)return;
 const b=s.ball;if(b.holder<0)return;
 const q=s.players[b.holder],cq=game.ctrls[q.id];if(!cq||cq.type!=='ai')return;
 const hum=s.players.filter(p=>p.team===q.team&&game.ctrls[p.id].type==='human'&&!game.ctrls[p.id].peer);
 if(hum.length!==1)return;
 const p=hum[0],cp=game.ctrls[p.id];
 game.ctrls[q.id]=cp;game.ctrls[p.id]={type:'ai',diff:'normal'};p.charging=false;q.charging=false;q.kickUsed=true;
 popup('▼',q.x,q.y,cp.slot===1?'#3fd8ff':'#ff5aa8');
}

/* ===================== CÁMARA 2K =====================
   Cámara en tercera persona detrás de tu jugador, mirando al aro (como en los juegos de básquet de consola).
   Todo en pixel art: piso de parquet proyectado píxel a píxel (como el "modo 7" de las consolas viejas),
   estadio con tribunas llenas, carteles LED, mesa de control, y jugadores dibujados con esqueleto 3D
   (se ven de frente, de espalda o de costado según hacia dónde miran). Con la cámara 2K las teclas son relativas
   a la cámara: W va hacia el aro. */
const K2={F:300,H:3.7,BACK:5.0,PITCH:0.24,TP:24};
function cam2kOn(){return !!(game&&!game.demo&&!game.replay&&!game.pens&&setup.cam2k&&game.k2&&game.k2.ok);}
function k2Me(s){
 if(game.net){const id=game.myId;return id!=null?s.players[id]:null;}
 const hs=s.players.filter(p=>game.ctrls[p.id]&&game.ctrls[p.id].type==='human');
 return hs.find(p=>game.ctrls[p.id].slot===1)||hs[0]||null;
}
// actualiza la cámara (se llama en cada cuadro, antes de leer los controles)
function k2Update(dt){
 const s=game.state,K=game.k2||(game.k2={ok:false,fx:0,fy:0,yaw:0,init:false});
 const me=k2Me(s);if(!me||!setup.cam2k){K.ok=false;return;}
 const b=s.ball,poss=b.holder>=0?s.players[b.holder].team:(b.shot?b.shot.team:b.lastTeam);
 const atk=poss<0?me.team:poss;
 const hx=SIM.hoopX(s,atk);
 const onO=atk===me.team;
 // a quién sigue: a vos en ataque; en defensa, a la pelota (así te ves entre el rival y tu aro)
 const tx=onO?me.x:b.x*0.6+me.x*0.4,ty=onO?me.y:b.y*0.6+me.y*0.4;
 const axis=hx>0?0:Math.PI;let want=Math.atan2(-ty,hx-tx);
 let df=want-axis;while(df>Math.PI)df-=2*Math.PI;while(df<-Math.PI)df+=2*Math.PI;df=SIM.clamp(df,-0.6,0.6);want=axis+df;
 if(!K.init){K.fx=tx;K.fy=ty;K.yaw=want;K.init=true;}
 const a=Math.min(1,dt*4.5);K.fx+=(tx-K.fx)*a;K.fy+=(ty-K.fy)*a;
 let dy=want-K.yaw;while(dy>Math.PI)dy-=2*Math.PI;while(dy<-Math.PI)dy+=2*Math.PI;K.yaw+=dy*Math.min(1,dt*(Math.abs(dy)>1.5?2.2:3.2));
 K.cx=K.fx-Math.cos(K.yaw)*K2.BACK;K.cy=K.fy-Math.sin(K.yaw)*K2.BACK;K.ok=true;K.me=me;
}
// mundo → pantalla (pbuf 640×400). Devuelve [x,y,escala(px por metro),profundidad] o null si queda detrás
function k2P(x,y,z){
 const K=game.k2,rx=x-K.cx,ry=y-K.cy,c=Math.cos(K.yaw),sn=Math.sin(K.yaw);
 const Z=rx*c+ry*sn,X=-rx*sn+ry*c,Yc=z-K2.H,cp=Math.cos(K2.PITCH),sp=Math.sin(K2.PITCH);
 const d=-Yc*sp+Z*cp,v=Yc*cp+Z*sp;if(d<0.3)return null;
 return[PW/2+X*K2.F/d,PH*0.4-v*K2.F/d,K2.F/d,d];
}
function k2Depth(x,y,z){const K=game.k2,rx=x-K.cx,ry=y-K.cy,c=Math.cos(K.yaw),sn=Math.sin(K.yaw),Z=rx*c+ry*sn,Yc=(z||0)-K2.H;return -Yc*Math.sin(K2.PITCH)+Z*Math.cos(K2.PITCH);}
// pantalla → piso (para apuntar el pase con el mouse)
function k2Floor(px,py){
 const cp=Math.cos(K2.PITCH),sp=Math.sin(K2.PITCH),t=(PH*0.4-py)/K2.F,X0=(px-PW/2)/K2.F;
 const Yr=t*cp-sp,Zr=t*sp+cp;if(Yr>=-1e-4)return null;const k=-K2.H/Yr,Z=Zr*k,X=X0*k;
 const K=game.k2,c=Math.cos(K.yaw),sn=Math.sin(K.yaw);return[K.cx+Z*c-X*sn,K.cy+Z*sn+X*c];
}
function k2Line(g,pts,col){let lp=null;for(const q of pts){const p=k2P(q[0],q[1],q[2]||0);if(p&&lp)pline(g,lp[0],lp[1],p[0],p[1],col);lp=p;}}
// recorta un polígono contra el plano cercano y lo pinta
function k2Poly(g,wpts,col){
 const near=0.35;
 const dep=q=>k2Depth(q[0],q[1],q[2]||0);const out=[];
 for(let i=0;i<wpts.length;i++){const a=wpts[i],b=wpts[(i+1)%wpts.length],da=dep(a),db=dep(b);
  if(da>=near)out.push(a);
  if((da>=near)!==(db>=near)){const t=(near-da)/(db-da);out.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,(a[2]||0)+((b[2]||0)-(a[2]||0))*t]);}}
 if(out.length<3)return;const P2=out.map(q=>k2P(q[0],q[1],q[2]||0)).filter(Boolean);if(P2.length>=3)polyFill(g,P2,col);
}
const k2rnd=n=>{n=(n^61)^(n>>>16);n=Math.imul(n,9);n^=n>>>4;n=Math.imul(n,0x27d4eb2d);n^=n>>>15;return(n>>>0)/4294967296;};
const k2pix=(c,col)=>{c.fillStyle=col;c.fillRect(0,0,1,1);const d=c.getImageData(0,0,1,1).data;return(255<<24)|(d[2]<<16)|(d[1]<<8)|d[0];};

/* ---------- texturas (se arman una vez por partido) ---------- */
let k2T=null;
function k2Tex(s){
 const key=s.L+'|'+s.W+'|'+game.kits[0].p+game.kits[1].p+game.teams[0].id+game.teams[1].id+'|'+fontsReady;
 if(k2T&&k2T.key===key)return k2T;
 const TP=K2.TP,MX=6,MY=5,L2=s.L/2,W2=s.W/2,home=game.kits[0],away=game.kits[1],tm=game.teams[0];
 const w=Math.round((s.L+MX*2)*TP),h=Math.round((s.W+MY*2)*TP);
 const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');
 const X=x=>(x+L2+MX)*TP,Y=y=>(y+W2+MY)*TP;
 g.fillStyle='#120d0a';g.fillRect(0,0,w,h);
 // banda de color del equipo alrededor de la cancha (como las canchas de la NBA de ahora)
 g.fillStyle=sh(home.p,-0.6);g.fillRect(X(-L2-2.4),Y(-W2-2.0),(s.L+4.8)*TP,(s.W+4.0)*TP);
 g.fillStyle=sh(home.p,-0.45);g.fillRect(X(-L2-2.4),Y(-W2-2.0),(s.L+4.8)*TP,2);g.fillRect(X(-L2-2.4),Y(W2+2.0)-2,(s.L+4.8)*TP,2);
 // parquet: tablas a lo largo de la cancha, con juntas y vetas
 const PL=0.25*TP;let n=0;
 for(let y=Y(-W2),row=0;y<Y(W2)-0.5;y+=PL,row++){let x=X(-L2)-k2rnd(row*7+1)*2*TP;
  while(x<X(L2)){const len=(1.4+k2rnd(++n)*2.8)*TP,tone=k2rnd(n*3+5);const x0=Math.max(X(-L2),x),x1=Math.min(X(L2),x+len);
   if(x1>x0){g.fillStyle=tone<0.3?'#cd9056':tone<0.6?'#c68649':tone<0.85?'#d29a5f':'#bf7f45';g.fillRect(x0,y,x1-x0,PL);
    for(let k=0;k<4;k++){const gx=x0+k2rnd(n*11+k)*(x1-x0),gy=y+1+Math.floor(k2rnd(n*13+k)*(PL-2));g.fillStyle=k%2?'rgba(120,64,24,0.22)':'rgba(255,220,170,0.12)';g.fillRect(gx,gy,4+k2rnd(n*17+k)*18,1);}
    g.fillStyle='rgba(70,36,12,0.45)';g.fillRect(x0,y,1,PL);}
   x+=len;}
  g.fillStyle='rgba(70,36,12,0.35)';g.fillRect(X(-L2),y,s.L*TP,1);}
 const tex2=p=>{g.beginPath();p();};
 for(const sd of [-1,1]){
  const hx=sd*(L2-SIM.HOOP_OFF),yc=W2-0.9,ang=Math.asin(Math.min(1,yc/s.R3)),xa=hx-sd*Math.cos(ang)*s.R3;
  // zona de dos puntos con un barniz apenas más oscuro
  tex2(()=>{g.moveTo(X(sd*L2),Y(-yc));g.lineTo(X(xa),Y(-yc));for(let i=0;i<=40;i++){const a=-ang+i/40*2*ang;g.lineTo(X(hx-sd*Math.cos(a)*s.R3),Y(Math.sin(a)*s.R3));}g.lineTo(X(sd*L2),Y(yc));g.closePath();});
  g.fillStyle='rgba(110,50,10,0.13)';g.fill();
  // pintura
  g.fillStyle=home.p;g.fillRect(Math.min(X(sd*L2),X(sd*(L2-5.8))),Y(-2.45),5.8*TP,4.9*TP);
  g.fillStyle=sh(home.p,-0.18);g.fillRect(Math.min(X(sd*L2),X(sd*(L2-5.8))),Y(-2.45),5.8*TP,3);g.fillRect(Math.min(X(sd*L2),X(sd*(L2-5.8))),Y(2.45)-3,5.8*TP,3);
 }
 // círculo central con las siglas del local
 g.fillStyle=home.p;g.beginPath();g.arc(X(0),Y(0),1.8*TP,0,Math.PI*2);g.fill();
 g.fillStyle=home.s;g.beginPath();g.arc(X(0),Y(0),1.25*TP,0,Math.PI*2);g.fill();
 g.fillStyle=home.p;g.beginPath();g.arc(X(0),Y(0),1.1*TP,0,Math.PI*2);g.fill();
 const txt=(str,x,y,rot,size,col,sh2)=>{g.save();g.translate(X(x),Y(y));g.rotate(rot);g.font=`${Math.round(size*TP)}px Silkscreen, monospace`;g.textAlign='center';g.textBaseline='middle';if(sh2){g.fillStyle=sh2;g.fillText(str,2,2);}g.fillStyle=col;g.fillText(str,0,0);g.restore();};
 txt((tm.abbr||tm.name.slice(0,3)).toUpperCase(),0,0,Math.PI/2,0.95,home.s,sh(home.p,-0.4));
 // nombre del local detrás de cada línea de fondo y la marca en los costados
 txt(tm.name.toUpperCase(),L2+1.2,0,Math.PI/2,0.85,home.s);txt(tm.name.toUpperCase(),-L2-1.2,0,-Math.PI/2,0.85,home.s);
 txt('TRIPLE·PIXEL',-L2*0.5,-W2-1.0,0,0.7,'rgba(255,255,255,0.75)');txt('TRIPLE·PIXEL',L2*0.5,W2+1.0,Math.PI,0.7,'rgba(255,255,255,0.75)');
 // líneas
 g.strokeStyle='#f6f1e4';g.lineWidth=0.09*TP;g.lineCap='butt';
 const ln=f=>{g.beginPath();f();g.stroke();};
 ln(()=>g.rect(X(-L2),Y(-W2),s.L*TP,s.W*TP));ln(()=>{g.moveTo(X(0),Y(-W2));g.lineTo(X(0),Y(W2));});
 ln(()=>g.arc(X(0),Y(0),1.8*TP,0,Math.PI*2));ln(()=>g.arc(X(0),Y(0),0.6*TP,0,Math.PI*2));
 for(const sd of [-1,1]){
  const hx=sd*(L2-SIM.HOOP_OFF),kx=sd*(L2-5.8),yc=W2-0.9,ang=Math.asin(Math.min(1,yc/s.R3)),xa=hx-sd*Math.cos(ang)*s.R3;
  ln(()=>g.rect(Math.min(X(sd*L2),X(kx)),Y(-2.45),5.8*TP,4.9*TP));
  ln(()=>g.arc(X(kx),Y(0),1.8*TP,sd>0?Math.PI/2:-Math.PI/2,sd>0?Math.PI*1.5:Math.PI/2));
  ln(()=>{g.moveTo(X(sd*L2),Y(-yc));g.lineTo(X(xa),Y(-yc));for(let i=0;i<=40;i++){const a=-ang+i/40*2*ang;g.lineTo(X(hx-sd*Math.cos(a)*s.R3),Y(Math.sin(a)*s.R3));}g.lineTo(X(sd*L2),Y(yc));});
  ln(()=>g.arc(X(hx),Y(0),1.25*TP,sd>0?Math.PI/2:-Math.PI/2,sd>0?Math.PI*1.5:Math.PI/2));
  for(const yy of [-1,1])for(const dk of [2.1,3.0,3.9]){g.fillStyle='#f6f1e4';g.fillRect(X(sd*(L2-dk))-1,Y(yy*2.45)+(yy>0?0:-0.25*TP),2,0.25*TP);}
  g.fillStyle='#f6f1e4';g.fillRect(X(sd*(L2-SIM.HOOP_OFF+0.38))-1,Y(-0.3),2,0.6*TP);
 }
 // luz del estadio horneada: más brillo en el centro, bordes en penumbra, y reflejos de los focos
 const gr=g.createRadialGradient(X(0),Y(0),2*TP,X(0),Y(0),(L2+5)*TP);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(0.7,'rgba(0,0,0,0.12)');gr.addColorStop(1,'rgba(0,0,0,0.5)');
 g.fillStyle=gr;g.fillRect(0,0,w,h);
 g.globalCompositeOperation='lighter';
 for(const lx of [-0.62,-0.2,0.2,0.62])for(const ly of [-0.45,0.45]){const cx=X(lx*L2),cy=Y(ly*W2),rr=2.6*TP;const gl=g.createRadialGradient(cx,cy,0,cx,cy,rr);gl.addColorStop(0,'rgba(255,236,200,0.16)');gl.addColorStop(1,'rgba(255,236,200,0)');g.fillStyle=gl;g.fillRect(cx-rr,cy-rr,rr*2,rr*2);}
 g.globalCompositeOperation='source-over';
 // niveles más chicos para lo lejano (así el parquet no "titila")
 const lv=[];let src=c;
 for(let i=0;i<5;i++){let cv=src;if(i>0){cv=document.createElement('canvas');cv.width=Math.max(1,Math.round(src.width/2));cv.height=Math.max(1,Math.round(src.height/2));const cg=cv.getContext('2d');cg.imageSmoothingEnabled=true;cg.imageSmoothingQuality='high';cg.drawImage(src,0,0,cv.width,cv.height);}
  const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height);lv.push({w:cv.width,h:cv.height,d:new Uint32Array(d.data.buffer)});src=cv;}
 const outside=k2pix(g,'#0d0a08');
 // tribunas (2 cuadros: normal y festejando), cartel LED y textura de pantalla
 const crowd=[k2CrowdTex(0),k2CrowdTex(1)],court=[k2CourtsideTex(0),k2CourtsideTex(1)];
 const led=document.createElement('canvas');led.width=1200;led.height=10;const lg=led.getContext('2d');
 const ads=[['#0a0a0a',home.p,'TRIPLE·PIXEL'],[home.p,home.s,tm.name.toUpperCase()],['#141414','#7cfc00','CHORI & PAN'],['#f2a900','#1a1a1a','PIXEL COLA'],['#f4f4f2','#0b3d91','EL POTRERO'],[away.p,away.s,game.teams[1].name.toUpperCase()],['#5b2a86','#ffffff','ALFAJOR 3X'],['#c8102e','#ffffff','¡DE TRES!']];
 lg.font='8px Silkscreen, monospace';lg.textBaseline='middle';lg.textAlign='center';
 ads.forEach((a,i)=>{lg.fillStyle=a[0];lg.fillRect(i*150,0,150,10);lg.fillStyle=a[1];lg.fillText(a[2],i*150+75,5.5);});
 lg.fillStyle='rgba(0,0,0,0.25)';for(let y=1;y<10;y+=2)lg.fillRect(0,y,1200,1);
 return k2T={key,TP,ox:L2+MX,oy:W2+MY,lv,outside,crowd,court,led};
}
// tribuna: escalones con gente sentada, pasillos con escaleras, más oscuro arriba
function k2CrowdTex(cheer){
 const c=document.createElement('canvas');c.width=600;c.height=150;const g=c.getContext('2d');
 const k0=game.kits[0],k1=game.kits[1],neutral=['#2f3a4a','#4a4f5a','#6b5b4a','#283642','#5a3a4a','#d8d0c0','#8a8f98'];
 g.fillStyle='#1d2027';g.fillRect(0,0,600,150);
 for(let tier=0;tier<14;tier++){const yb=Math.round(150-tier*10.7);
  g.fillStyle=tier%2?'#252831':'#2a2d37';g.fillRect(0,yb-11,600,11);g.fillStyle='#121419';g.fillRect(0,yb-1,600,1);g.fillStyle='#3a3e4a';g.fillRect(0,yb-11,600,1);
  for(let x=1;x<600;x+=5){
   if(x%150<8){g.fillStyle=(yb+x)%4<2?'#4a4e5a':'#3d414c';g.fillRect(x-1,yb-11,6,11);continue;}
   const id=tier*1000+x,r1=k2rnd(id),r2=k2rnd(id+77),r3=k2rnd(id+191);
   g.fillStyle=tier<5?'#7a1f24':'#4a1c22';g.fillRect(x,yb-5,4,4);
   if(r1<0.1)continue;
   const shirt=r2<0.58?(r3<0.6?k0.p:k0.s):r2<0.8?(r3<0.6?k1.p:k1.s):neutral[Math.floor(r3*neutral.length)];
   const skin=SKIN[Math.floor(k2rnd(id+5)*4)],up=cheer&&r3<0.55?1+(r3<0.25?1:0):0;
   g.fillStyle=shirt;g.fillRect(x,yb-8-up,4,5);
   g.fillStyle=skin;g.fillRect(x+1,yb-10-up,2,2);g.fillStyle=k2rnd(id+9)<0.5?'#1b1410':'#5a3a20';g.fillRect(x+1,yb-11-up,2,1);
   if(cheer&&r3<0.4){g.fillStyle=skin;g.fillRect(x,yb-12-up,1,3);g.fillRect(x+3,yb-12-up,1,3);}
   if(cheer&&r3<0.05){g.fillStyle=r2<0.6?k0.s:k1.s;g.fillRect(x-1,yb-16-up,5,3);}
  }}
 const gr=g.createLinearGradient(0,0,0,150);gr.addColorStop(0,'rgba(5,6,10,0.72)');gr.addColorStop(0.55,'rgba(5,6,10,0.25)');gr.addColorStop(1,'rgba(5,6,10,0)');g.fillStyle=gr;g.fillRect(0,0,600,150);
 return c;
}
// primera fila junto a la cancha: sillas y gente (fondo transparente)
function k2CourtsideTex(cheer){
 const c=document.createElement('canvas');c.width=600;c.height=14;const g=c.getContext('2d');
 const k0=game.kits[0],k1=game.kits[1],neutral=['#1d1f24','#3a3f4a','#d8d0c0','#7a6a5a','#2a3a5a'];
 for(let x=2;x<600;x+=6){const id=9000+x;if(x%100<12)continue;
  g.fillStyle='#22252c';g.fillRect(x,6,5,6);g.fillStyle='#3a3e48';g.fillRect(x,12,1,2);g.fillRect(x+4,12,1,2);
  if(k2rnd(id)<0.12)continue;const r2=k2rnd(id+3),up=cheer&&r2<0.6?1:0;
  g.fillStyle=r2<0.4?k0.p:neutral[Math.floor(k2rnd(id+4)*neutral.length)];g.fillRect(x+1,4-up,4,6);
  g.fillStyle=SKIN[Math.floor(k2rnd(id+5)*4)];g.fillRect(x+2,1-up,2,3);g.fillStyle='#1b1410';g.fillRect(x+2,1-up,2,1);
  g.fillStyle='#2b2f3a';g.fillRect(x+1,10,4,2);
 }
 return c;
}

/* ---------- piso en perspectiva (píxel a píxel) ---------- */
function k2Floor7(g,hy){
 const T=k2Tex(game.state),K=game.k2,cp=Math.cos(K2.PITCH),sp=Math.sin(K2.PITCH),c=Math.cos(K.yaw),sn=Math.sin(K.yaw);
 const y0=Math.max(0,Math.min(PH,hy)),rows=PH-y0;if(rows<=0)return;
 if(!K.img||K.img.height!==rows)K.img=g.createImageData(PW,rows);
 const out=new Uint32Array(K.img.data.buffer),TP=T.TP,nl=T.lv.length;
 for(let py=y0;py<PH;py++){
  const t=(PH*0.4-(py+0.5))/K2.F,Yr=t*cp-sp,o=(py-y0)*PW;
  if(Yr>=-1e-4){out.fill(T.outside,o,o+PW);continue;}
  const k=-K2.H/Yr,Z=(t*sp+cp)*k,step=k/K2.F,X0=(0.5-PW/2)*step;
  const tpp=step*TP;let lv=0;while(lv<nl-1&&tpp>1.6*(1<<lv))lv++;
  const L=T.lv[lv],sc=TP/(1<<lv),lw=L.w,lh=L.h,d=L.d;
  let u=(K.cx+Z*c-X0*sn+T.ox)*sc,v=(K.cy+Z*sn+X0*c+T.oy)*sc;const du=-step*sn*sc,dv=step*c*sc;
  for(let px=0;px<PW;px++){out[o+px]=(u>=0&&v>=0&&u<lw&&v<lh)?d[(v|0)*lw+(u|0)]:T.outside;u+=du;v+=dv;}
 }
 g.putImageData(K.img,0,y0);
}

/* ---------- paredes con textura (tribunas, carteles, mesa) ----------
   ax:'x' → pared en x=pos que corre a lo largo de y; 'y' → en y=pos a lo largo de x.
   segs: [salida0,z0,salida1,z1,filaTex0,filaTex1]; la salida se suma hacia afuera de la cancha. */
function k2Wall(g,ax,pos,a0,a1,cw,tex,tpm,segs,scroll,dir){
 const out=Math.sign(pos)||1,n=Math.ceil((a1-a0)/cw),lv=segs.length;
 const pt=(a,off,z)=>ax==='x'?k2P(pos+out*off,a,z):k2P(a,pos+out*off,z);
 let prev=null;const tw=tex.width,sw=Math.max(1,Math.round(cw*tpm));
 for(let i=0;i<=n;i++){const a=a0+i*cw,cur=[];
  for(let j=0;j<lv;j++){const S=segs[j];cur.push([pt(a,S[0],S[1]),pt(a,S[2],S[3])]);}
  if(prev){
   const ai=dir>0?i-1:n-i;let sx=((Math.round(ai*cw*tpm+(scroll||0))%tw)+tw)%tw;if(sx+sw>tw)sx=tw-sw;
   for(let j=0;j<lv;j++){const A=prev[j],B=cur[j];if(!A[0]||!A[1]||!B[0]||!B[1])continue;if(A[0][2]>85||B[0][2]>85)continue;
    let xl=Math.round((A[0][0]+A[1][0])/2),xr=Math.round((B[0][0]+B[1][0])/2);if(xr<xl){const q=xl;xl=xr;xr=q;}
    if(xr<=xl||xr<0||xl>PW)continue;
    const yt=Math.round((A[1][1]+B[1][1])/2),yb=Math.round((A[0][1]+B[0][1])/2);if(yb<=yt||yb<0||yt>PH)continue;
    const S=segs[j],m=Math.max(1,Math.ceil((xr-xl)/(sw>6?8:4)));
    if(m===1){g.drawImage(tex,sx,S[4],sw,S[5]-S[4],xl,yt,xr-xl,yb-yt);continue;}
    // columna ancha (cerca de la cámara): se parte en tiras finas para que el borde no quede escalonado
    const ax0=(A[0][0]+A[1][0])/2,bx0=(B[0][0]+B[1][0])/2,rev=bx0<ax0;let px0=xl;
    for(let k=1;k<=m;k++){const f=k/m,px1=Math.round(xl+(xr-xl)*f),fm=(k-0.5)/m,ff=rev?1-fm:fm;
     const ytk=Math.round(A[1][1]+(B[1][1]-A[1][1])*ff),ybk=Math.round(A[0][1]+(B[0][1]-A[0][1])*ff);
     if(px1>px0&&ybk>ytk){const s0=(k-1)/m;g.drawImage(tex,sx+sw*s0,S[4],sw/m,S[5]-S[4],px0,ytk,px1-px0,ybk-ytk);}px0=px1;}}
  }
  prev=cur;}
}
function k2Arena(g,s,t,cheer){
 const T=k2Tex(s),L2=s.L/2,W2=s.W/2,SX=L2+4.6,SY=W2+4.2,fr=cheer>0&&Math.floor(t*6)%2?1:0;
 const crowd=T.crowd[fr],court=T.court[fr],scroll=t*14;
 const segsStand=[[0,0,0,1.0,0,10,'led'],[0,1.0,3.2,3.0,112,150],[3.2,3.0,6.4,5.1,75,112],[6.4,5.1,9.6,7.2,38,75],[9.6,7.2,12.8,9.3,0,38]];
 const walls=[['x',SX,-SY-7,SY+7,1],['x',-SX,-SY-7,SY+7,-1],['y',-SY,-SX-7,SX+7,1],['y',SY,-SX-7,SX+7,-1]];
 for(const [ax,pos,a0,a1,dir] of walls){
  k2Wall(g,ax,pos,a0,a1,0.5,T.led,10,[segsStand[0]],scroll,dir);
  k2Wall(g,ax,pos,a0,a1,1.0,crowd,10,segsStand.slice(1),0,dir);
  // focos arriba de la tribuna
  for(let a=a0+2;a<a1;a+=4){const out=Math.sign(pos),q=ax==='x'?k2P(pos+out*13.2,a,9.9):k2P(a,pos+out*13.2,9.9);if(!q||q[1]<-4)continue;const r=Math.max(1,Math.round(q[2]*0.35));
   g.fillStyle='#2a2e36';g.fillRect(Math.round(q[0]-r*2),Math.round(q[1]-r),r*4,r*2);g.fillStyle='#fff6d8';g.fillRect(Math.round(q[0]-r*2)+1,Math.round(q[1]-r)+1,Math.max(1,r*4-2),Math.max(1,r*2-2));}
 }
 // primera fila junto a la cancha (a los costados), la mesa de control y los bancos
 for(const sy of [-1,1]){const pos=sy*(W2+2.6);
  if(sy<0){k2Wall(g,'y',pos,-SX+1,-4.2,0.5,court,10,[[0,0,0,1.4,0,14]],0,1);k2Wall(g,'y',pos,4.2,SX-1,0.5,court,10,[[0,0,0,1.4,0,14]],0,1);}
  else k2Wall(g,'y',pos,-SX+1,SX-1,0.5,court,10,[[0,0,0,1.4,0,14]],0,-1);}
 const ty=-(W2+1.3);
 k2Poly(g,[[-3.4,ty,0.82],[3.4,ty,0.82],[3.4,ty-0.75,0.82],[-3.4,ty-0.75,0.82]],'#15171c');
 for(let i=0;i<8;i++){const q=k2P(-2.8+i*0.8,ty-0.45,1.05);if(!q)continue;const u=q[2]/12;if(u<0.3)continue;
  g.fillStyle=i%2?'#2a2d35':'#e8e4dc';g.fillRect(Math.round(q[0]-2.2*u),Math.round(q[1]-1*u),Math.max(1,Math.round(4.4*u)),Math.max(1,Math.round(4*u)));
  g.fillStyle=SKIN[(i*3)%4];g.fillRect(Math.round(q[0]-1.2*u),Math.round(q[1]-4.2*u),Math.max(1,Math.round(2.4*u)),Math.max(1,Math.round(2.6*u)));}
 k2Wall(g,'y',ty,-3.4,3.4,0.5,T.led,10,[[0,0,0,0.82,0,10]],scroll*0.6+300,1);
 for(const sx of [-1,1]){const kit=game.kits[sx<0?0:1];
  k2Poly(g,[[sx*4.6,ty-0.2,0.45],[sx*10.5,ty-0.2,0.45],[sx*10.5,ty-0.75,0.45],[sx*4.6,ty-0.75,0.45]],'#24272e');
  for(let i=0;i<7;i++){const q=k2P(sx*(5.2+i*0.8),ty-0.5,0.45);if(!q)continue;const u=q[2]/12;if(u<0.3)continue;const bob=cheer>0&&(sx<0)===(s.lastGoalTeam===0)?Math.abs(Math.sin(t*9+i))*3*u:0;
   g.fillStyle=kit.p;g.fillRect(Math.round(q[0]-2*u),Math.round(q[1]-6*u-bob),Math.max(1,Math.round(4*u)),Math.max(1,Math.round(6*u)));
   g.fillStyle=SKIN[(i+sx+4)%4];g.fillRect(Math.round(q[0]-1.2*u),Math.round(q[1]-8.8*u-bob),Math.max(1,Math.round(2.4*u)),Math.max(1,Math.round(2.8*u)));}}
}

// dónde se dibuja la pelota: al picar se corre un poco hacia el costado de la mano (así se ve desde atrás)
function k2BallPos(s){const b=s.ball;if(b.holder>=0&&!b.shot){const h=s.players[b.holder];if(!h.charging&&!(h.shootT>0)&&!(h.dunkT>0)&&!(h.hangT>0)&&!(h.jz>0.12)){const sg=Math.sign(h.handS||h.hand||1)||1,fx=Math.cos(h.face),fy=Math.sin(h.face);return[b.x-fy*0.2*sg,b.y+fx*0.2*sg,b.z];}}return[b.x,b.y,b.z];}
/* ---------- jugadores con esqueleto 3D ----------
   unidades: el jugador mide 24 (2 m). Cada articulación es [lateral(+derecha), adelante, arriba]. */
const K2B={hipL:[-1.3,0,11],hipR:[1.3,0,11],kneeL:[-1.45,0.3,6],kneeR:[1.45,0.3,6],footL:[-1.55,0,0.6],footR:[1.55,0,0.6],
 shL:[-2.7,0,18],shR:[2.7,0,18],elL:[-3.3,-0.3,14.6],elR:[3.3,-0.3,14.6],haL:[-3.5,0.2,11.4],haR:[3.5,0.2,11.4],neck:[0,0,19.3],head:[0,0,21.8]};
const K2UP=['hipL','hipR','shL','shR','elL','elR','haL','haR','neck','head'];
function k2Pose(p,s,t){
 const J={};for(const k in K2B)J[k]=K2B[k].slice();
 const b=s.ball,hasB=b.holder===p.id,spd=Math.hypot(p.vx,p.vy),moving=spd>0.6,amp=Math.min(1.15,spd/5.5)*(p.spr?1.15:1);
 const air=p.jz>0.12||p.hangT>0,cele=s.phase==='goal'&&p.team===s.lastGoalTeam;
 const arm=(S,el,ha)=>{J['el'+S]=el;J['ha'+S]=ha;};
 let lift=0;
 // piernas
 if(p.hangT>0){J.kneeL=[-1.3,1.8,6.6];J.kneeR=[1.3,1.2,6.4];J.footL=[-1.4,0.4,1.8];J.footR=[1.4,-0.2,1.6];}
 else if(air){J.kneeL=[-1.4,1.6,6.8];J.kneeR=[1.4,1.0,6.2];J.footL=[-1.5,-0.4,2.4];J.footR=[1.5,-0.9,1.7];}
 else if(moving){const sw=Math.sin(p.run||0),cl=Math.cos(p.run||0);
  for(const [S,sg,x] of [['L',1,-1.3],['R',-1,1.3]]){const w=sw*sg,c2=Math.max(0,cl*sg);J['foot'+S]=[x,3.1*w*amp,0.6+c2*2.6*amp];J['knee'+S]=[x*1.05,(1.4*w+1.1*c2)*amp+0.3,6+c2*1.4*amp];}
  lift=Math.abs(sw)*0.55*amp-0.35*amp;
  arm('L',[-3.2,-1.4*sw*amp,14.5],[-3.0,-2.6*sw*amp+0.5,11.8+Math.max(0,-sw)*2.6*amp]);
  arm('R',[3.2,1.4*sw*amp,14.5],[3.0,2.6*sw*amp+0.5,11.8+Math.max(0,sw)*2.6*amp]);
 } else {
  const cr=hasB?1.1:p.pressing?2.1:0;
  if(cr>0){J.footL=[-2.3,0.3,0.6];J.footR=[2.3,-0.3,0.6];J.kneeL=[-2.35,1.3,5.6-cr*0.35];J.kneeR=[2.35,1.0,5.6-cr*0.35];lift=-cr;}
  else{lift=Math.sin(t*2.4+p.id)*0.15;arm('L',[-3.2,-0.2,14.6],[-3.3,0.4,11.6]);arm('R',[3.2,-0.2,14.6],[3.3,0.4,11.6]);}
 }
 // brazos según la jugada
 if(p.hangT>0){arm('L',[-1.9,0.4,23.6],[-1.0,0.7,27.2]);arm('R',[1.9,0.4,23.6],[1.0,0.7,27.2]);}
 else if(p.dunkT>0){arm('R',[1.6,1.3,22.6],[1.0,2.2,26.6]);arm('L',[-3.0,-0.6,15.6],[-3.6,-1.2,13.0]);}
 else if(p.charging||p.shootT>0.12||air){
  if(p.shootT>0&&!p.charging&&!hasB){arm('R',[1.4,1.8,22.8],[0.8,2.8,26.0]);arm('L',[-2.0,1.2,21.6],[-1.5,1.6,24.0]);}
  else{arm('L',[-2.2,1.0,21.0],[-1.0,1.4,23.6]);arm('R',[2.2,1.0,21.0],[1.0,1.4,23.8]);}}
 else if(p.swipeT>0){arm('R',[2.6,2.2,15.6],[2.0,4.8,14.0]);}
 else if(p.kickAnim>0){arm('L',[-2.4,1.6,15],[-0.9,3.9,15.4]);arm('R',[2.4,1.6,15],[0.9,3.9,15.4]);}
 else if(p.pressing&&!hasB){arm('L',[-4.2,0.8,16.4],[-5.4,1.4,16.2]);arm('R',[4.2,0.8,16.4],[5.4,1.4,16.2]);}
 if(cele){arm('L',[-3.4,0.2,21.6],[-3.8,0.4,25.2]);arm('R',[3.4,0.2,21.6],[3.8,0.4,25.2]);lift+=Math.abs(Math.sin(t*9+p.id))*1.2;}
 if(p.spr&&moving&&!air)for(const k of K2UP)J[k][1]+=(J[k][2]-11)*0.09;
 for(const k of K2UP)J[k][2]+=lift;
 // con la pelota: las manos van a la pelota (picando, o las dos al tirar)
 if(hasB&&!b.shot){
  const bp=k2BallPos(s),fx=Math.cos(p.face),fy=Math.sin(p.face),dx=bp[0]-p.x,dy=bp[1]-p.y;
  const r=(dx*-fy+dy*fx)*12,f=(dx*fx+dy*fy)*12,u=(bp[2]-(p.jz||0))*12;
  const to=(S,tg)=>{const sh0=J['sh'+S],sg=S==='L'?-1:1;let v=[tg[0]-sh0[0],tg[1]-sh0[1],tg[2]-sh0[2]];const l=Math.hypot(...v);if(l>7.4)v=v.map(q=>q*7.4/l);
   J['ha'+S]=[sh0[0]+v[0],sh0[1]+v[1],sh0[2]+v[2]];J['el'+S]=[sh0[0]+v[0]*0.5+sg*0.9,sh0[1]+v[1]*0.5-0.3,sh0[2]+v[2]*0.5-0.8];};
  if(p.charging||p.shootT>0||p.dunkT>0||p.hangT>0||air||u>14){to('L',[r-1.1,f-0.2,u]);to('R',[r+1.1,f-0.2,u]);}
  else{const S=r>=0?'R':'L',O=S==='R'?'L':'R',sg=S==='R'?1:-1;to(S,[r,f,Math.max(8.2+lift,u+1.3)]);
   if(!moving||amp<0.5)arm(O,[-sg*3.4,0.8,15.2+lift],[-sg*3.2,2.6,14.6+lift]);}
 }
 return J;
}
// segmento grueso como cápsula (menos rectángulos que estampar discos)
function k2Seg(g,a,b,r,col){const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);const ri=Math.max(0,Math.round(r));
 if(l<1.5||ri<2){segD(g,a,b,r,col);return;}
 const nx=-dy/l*(ri+0.5),ny=dx/l*(ri+0.5);polyFill(g,[[a[0]+nx,a[1]+ny],[b[0]+nx,b[1]+ny],[b[0]-nx,b[1]-ny],[a[0]-nx,a[1]-ny]],col);disc(g,a[0],a[1],r,col);disc(g,b[0],b[1],r,col);}
// dibuja la figura (proyectada) — mismo estilo que el jugador grande de los penales, con vista de costado
function k2Fig(g,ox,oy,u,J,rel,o){
 const cr=Math.cos(rel),sr=Math.sin(rel),P={},D={};
 for(const n in J){const j=J[n];P[n]=[ox+(j[0]*cr+j[1]*sr)*u,oy-j[2]*u];D[n]=j[1]*cr-j[0]*sr;}
 const Lp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
 const k=o.kit,skin=o.skin,hair=o.hair,OL='#0b0d12',ru=x=>Math.max(1,x*u);
 const shoe=k.shoe||'#f2f2ee',shoeA=k.p===shoe?k.s:k.p;
 const legs=[],arms=[];
 for(const S of ['L','R']){
  const hip=P['hip'+S],kn=P['knee'+S],ft=P['foot'+S],dl=(D['knee'+S]+D['foot'+S])/2;
  const toe=[ft[0]+sr*1.25*u,ft[1]+0.25*u],heel=[ft[0]-sr*0.35*u,ft[1]+0.2*u];
  legs.push({d:dl,segs:[[Lp(hip,kn,0.55),kn,0.98,skin],[kn,Lp(kn,ft,0.62),0.86,skin],[Lp(kn,ft,0.6),Lp(kn,ft,0.86),0.84,k.socks]],shoe:[heel,toe,Lp(kn,ft,0.84)]});
  const s0=P['sh'+S],el=P['el'+S],ha=P['ha'+S];
  arms.push({d:(D['el'+S]+D['ha'+S])/2,segs:[[s0,el,0.8,skin],[el,ha,0.68,skin]],hand:ha,S});
 }
 legs.sort((a,b)=>b.d-a.d);arms.sort((a,b)=>b.d-a.d);
 const ct=Lp(P.shL,P.shR,0.5),cb=Lp(P.hipL,P.hipR,0.5);
 const wt=Math.max(Math.abs(P.shR[0]-P.shL[0])/2,1.25*u)+0.42*u,wb=Math.max(Math.abs(P.hipR[0]-P.hipL[0])/2,1.05*u)+0.5*u;
 const torso=[[ct[0]-wt,ct[1]-0.35*u],[ct[0]+wt,ct[1]-0.35*u],[cb[0]+wb,cb[1]-0.6*u],[cb[0]-wb,cb[1]-0.6*u]];
 const shorts=[];for(const S of ['L','R'])shorts.push([P['hip'+S],Lp(P['hip'+S],P['knee'+S],0.72),1.55]);
 const head=P.head,neck=P.neck,hr=2.3*u;
 // 1) contorno
 for(const L of legs){for(const q of L.segs)k2Seg(g,q[0],q[1],ru(q[2])+1,OL);k2Seg(g,L.shoe[2],L.shoe[1],ru(1.0)+1,OL);k2Seg(g,L.shoe[0],L.shoe[1],ru(0.85)+1,OL);}
 for(const q of shorts)k2Seg(g,q[0],q[1],ru(q[2])+1,OL);
 for(const A of arms){for(const q of A.segs)k2Seg(g,q[0],q[1],ru(q[2])+1,OL);disc(g,A.hand[0],A.hand[1],ru(0.74)+1,OL);}
 polyFill(g,[[torso[0][0]-1,torso[0][1]-1],[torso[1][0]+1,torso[1][1]-1],[torso[2][0]+1,torso[2][1]+1],[torso[3][0]-1,torso[3][1]+1]],OL);
 k2Seg(g,neck,head,ru(0.8)+1,OL);disc(g,head[0],head[1],hr+1,OL);
 const drawArm=A=>{for(const q of A.segs)k2Seg(g,q[0],q[1],ru(q[2]),q[3]);k2Seg(g,[A.segs[0][0][0]+ru(0.3),A.segs[0][0][1]],[A.segs[0][1][0]+ru(0.3),A.segs[0][1][1]],Math.max(0.5,ru(0.25)),sh(skin,-0.16));disc(g,A.hand[0],A.hand[1],ru(0.74),skin);};
 // 2) relleno: brazo de atrás, piernas, zapatillas, short, camiseta, brazo de adelante, cabeza
 for(const A of arms)if(A.d>0.9)drawArm(A);
 for(const L of legs){for(const q of L.segs)k2Seg(g,q[0],q[1],ru(q[2]),q[3]);
  k2Seg(g,L.shoe[2],L.shoe[1],ru(1.0),shoe);k2Seg(g,L.shoe[0],L.shoe[1],ru(0.85),shoe);
  g.fillStyle=shoeA;g.fillRect(Math.round(Math.min(L.shoe[0][0],L.shoe[1][0])),Math.round(L.shoe[1][1]-ru(0.2)),Math.max(1,Math.round(Math.abs(L.shoe[1][0]-L.shoe[0][0]))+1),Math.max(1,Math.round(ru(0.35))));
  g.fillStyle='#2a2a2a';g.fillRect(Math.round(Math.min(L.shoe[0][0],L.shoe[1][0])-ru(0.5)),Math.round(Math.max(L.shoe[0][1],L.shoe[1][1])+ru(0.7)),Math.max(1,Math.round(Math.abs(L.shoe[1][0]-L.shoe[0][0])+ru(1))),1);}
 for(const q of shorts)k2Seg(g,q[0],q[1],ru(q[2]),k.shorts);
 k2Seg(g,P.hipL,P.hipR,ru(1.45),k.shorts);
 for(const q of shorts){k2Seg(g,[q[0][0]+ru(0.7),q[0][1]],[q[1][0]+ru(0.7),q[1][1]],Math.max(0.5,ru(0.35)),sh(k.shorts,-0.16));
  g.fillStyle=k.s===k.shorts?k.num:k.s;const e=q[1];g.fillRect(Math.round(e[0]-ru(1.4)),Math.round(e[1]+ru(1.0)),Math.max(1,Math.round(ru(2.8))),Math.max(1,Math.round(u*0.35)));}
 const front=cr<-0.25,back=cr>0.25,halfW=wt,tl=Math.max(1,cb[1]-ct[1]);
 polyFill(g,torso,(x,y)=>{let lx=(x-(ct[0]+cb[0])/2)/halfW;const ly=(y-ct[1])/tl;
  if(back)lx=-lx;
  if(ly<0.12&&Math.abs(lx)<0.34&&!back&&Math.abs(cr)>0.25)return skin;
  if(ly<0.2&&Math.abs(lx)<0.42&&Math.abs(lx)>0.3&&Math.abs(cr)>0.25)return k.s===k.p?k.num:k.s;
  let col=patternAt(k,lx,1-ly);if(Math.abs(lx)>0.86)col=k.s===k.p?sh(k.p,-0.3):k.s;
  if(x>(ct[0]+cb[0])/2+halfW*0.55)col=sh(col,-0.18);else if(x<(ct[0]+cb[0])/2-halfW*0.6)col=sh(col,0.1);
  return col;});
 if((back||front)&&o.num!=null&&u>=1.2){const str=String(o.num),ps=Math.max(1,Math.round(u*(back?0.75:0.5))),w=str.length*4*ps-ps;const cx=(ct[0]+cb[0])/2,cy=back?ct[1]+tl*0.3:ct[1]+tl*0.28;
  g.fillStyle=k.num;for(let d=0;d<str.length;d++){const rows=DIGIT3[str[d]];if(!rows)continue;for(let r=0;r<5;r++)for(let q=0;q<3;q++)if(rows[r][q]==='#')g.fillRect(Math.round(cx-w/2+d*4*ps+q*ps),Math.round(cy+r*ps),ps,ps);}
  if(back&&u>=2.4){g.fillStyle=k.num;g.fillRect(Math.round(cx-w*0.55),Math.round(cy-ps*2),Math.round(w*1.1),Math.max(1,Math.round(ps*0.6)));}}
 for(const A of arms)if(A.d<=0.9)drawArm(A);
 k2Seg(g,neck,head,ru(0.8),sh(skin,-0.12));
 // cabeza píxel a píxel: de frente, de espalda o de perfil
 const hx=head[0],hy=head[1],R2=hr*hr,fs=sr>=0?1:-1,side=!front&&!back;
 for(let y=Math.floor(hy-hr);y<=Math.ceil(hy+hr);y++){let run=null,rs=0;const x0=Math.floor(hx-hr),x1=Math.ceil(hx+hr);
  for(let x=x0;x<=x1+1;x++){let col=null;const dx=x+0.5-hx,dy=y+0.5-hy;
   if(x<=x1&&dx*dx+dy*dy<=R2){const lx=dx/hr,ly=dy/hr;
    if(back)col=ly>0.5?sh(skin,-0.1):(o.band&&ly>-0.15&&ly<0.12?o.band:hair);
    else if(side)col=(ly<-0.3||lx*fs<-0.15&&ly<0.5)?hair:(o.band&&ly>-0.32&&ly<-0.12?o.band:(lx*fs<0.1?sh(skin,-0.12):skin));
    else col=(ly<-0.32||(Math.abs(lx)>0.8&&ly<0.15))?hair:(o.band&&ly>-0.32&&ly<-0.14?o.band:(lx>0.55?sh(skin,-0.14):skin));}
   if(col!==run){if(run){g.fillStyle=run;g.fillRect(rs,y,x-rs,1);}run=col;rs=x;}}}
 if(!back&&u>=1.3){const px=Math.max(1,Math.round(u*0.42));
  if(front){for(const sx of [-1,1]){g.fillStyle='#16110d';g.fillRect(Math.round(hx+sx*0.38*hr-px/2),Math.round(hy+0.05*hr),px,px+(u>3?1:0));g.fillStyle=sh(hair,0.1);g.fillRect(Math.round(hx+sx*0.4*hr-px),Math.round(hy-0.2*hr),px*2,1);}
   g.fillStyle=sh(skin,-0.35);if(o.happy){g.fillRect(Math.round(hx-px*1.5),Math.round(hy+0.55*hr),px*3,px);}else g.fillRect(Math.round(hx-px),Math.round(hy+0.55*hr),px*2,1);}
  else{g.fillStyle='#16110d';g.fillRect(Math.round(hx+fs*0.5*hr-px/2),Math.round(hy+0.02*hr),px,px+(u>3?1:0));g.fillStyle=sh(skin,-0.3);g.fillRect(Math.round(hx+fs*0.55*hr-px/2),Math.round(hy+0.56*hr),px,1);
   g.fillStyle=skin;g.fillRect(Math.round(hx+fs*hr-(fs>0?1:0)),Math.round(hy+0.15*hr),Math.max(1,Math.round(u*0.4)),Math.max(1,Math.round(u*0.5)));
   g.fillStyle=sh(skin,-0.2);g.fillRect(Math.round(hx-fs*0.1*hr),Math.round(hy),Math.max(1,Math.round(u*0.45)),Math.max(1,Math.round(u*0.7)));}}
}
const k2cv={};
function k2Canvas(id,w,h){let c=k2cv[id];if(!c||c.c.width<w||c.c.height<h){const cv=document.createElement('canvas');cv.width=Math.max(w,c?c.c.width:0);cv.height=Math.max(h,c?c.c.height:0);c=k2cv[id]={c:cv,g:cv.getContext('2d')};}return c;}

// línea en píxeles agrupando tramos (mucho más rápida que punto por punto)
function k2Ln(g,x0,y0,x1,y1,col,th){th=th||1;g.fillStyle=col;x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);
 const dx=x1-x0,dy=y1-y0;if(Math.abs(dx)>PW*3||Math.abs(dy)>PH*3)return;
 if(Math.abs(dx)>=Math.abs(dy)){const n=Math.abs(dx),sx=dx<0?-1:1;if(!n){g.fillRect(x0,y0,1,th);return;}let rs=x0,ry=y0;
  for(let i=1;i<=n;i++){const x=x0+i*sx,y=Math.round(y0+dy*i/n);if(y!==ry){g.fillRect(Math.min(rs,x-sx),ry,Math.abs(x-sx-rs)+1,th);rs=x;ry=y;}}g.fillRect(Math.min(rs,x1),ry,Math.abs(x1-rs)+1,th);}
 else{const n=Math.abs(dy),sy=dy<0?-1:1;let rs=y0,rx=x0;
  for(let i=1;i<=n;i++){const y=y0+i*sy,x=Math.round(x0+dx*i/n);if(x!==rx){g.fillRect(rx,Math.min(rs,y-sy),th,Math.abs(y-sy-rs)+1);rs=y;rx=x;}}g.fillRect(rx,Math.min(rs,y1),th,Math.abs(y1-rs)+1);}
}
/* ---------- aro ---------- */
function k2Box(g,x0,x1,y0,y1,z0,z1,col){
 const K=game.k2,faces=[[[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1],0,0,1],[[x0,y0,z0],[x1,y0,z0],[x1,y0,z1],[x0,y0,z1],0,-1,0],[[x0,y1,z0],[x1,y1,z0],[x1,y1,z1],[x0,y1,z1],0,1,0],[[x0,y0,z0],[x0,y1,z0],[x0,y1,z1],[x0,y0,z1],-1,0,0],[[x1,y0,z0],[x1,y1,z0],[x1,y1,z1],[x1,y0,z1],1,0,0]];
 const cx=(x0+x1)/2,cy=(y0+y1)/2,cz=(z0+z1)/2;
 for(const f of faces){const nx=f[4],ny=f[5],nz=f[6];const px=nx?(nx>0?x1:x0):cx,py=ny?(ny>0?y1:y0):cy,pz=nz?z1:cz;
  if((K.cx-px)*nx+(K.cy-py)*ny+(K2.H-pz)*nz<=0)continue;k2Poly(g,f.slice(0,4),nz?sh(col,0.18):nx?sh(col,-0.12):col);}
}
function k2Hoop(g,s,sd,t){
 const L2=s.L/2,bx=sd*(L2-SIM.BOARD_OFF),hx=sd*(L2-SIM.HOOP_OFF),RH=SIM.RIM_H,kit=game.kits[0];
 // base acolchada y poste
 const px=sd*(L2+1.25);
 k2Box(g,Math.min(px-0.55*sd,px+0.6*sd),Math.max(px-0.55*sd,px+0.6*sd),-0.55,0.55,0,1.05,kit.p);
 const base=k2P(px,0,1.05),top=k2P(px+sd*0.05,0,3.75),arm=k2P(bx+sd*0.15,0,3.55);
 if(base&&top){const w=Math.max(2,Math.round(0.2*base[2]));polyFill(g,[[base[0]-w/2,base[1]],[base[0]+w/2,base[1]],[top[0]+w/2,top[1]],[top[0]-w/2,top[1]]],'#2e3238');g.fillStyle='#4a505a';g.fillRect(Math.round(top[0]-w/2),Math.round(top[1]),1,Math.max(1,Math.round(base[1]-top[1])));}
 if(top&&arm){const w=Math.max(2,Math.round(0.14*top[2]));k2Ln(g,top[0],top[1],arm[0],arm[1],'#2a2e34',w);k2Ln(g,top[0],top[1],arm[0],arm[1],'#4a505a');}
 // tablero de vidrio con marco, cuadrado y protector abajo
 const C=[[bx,-0.9,3.95],[bx,0.9,3.95],[bx,0.9,2.9],[bx,-0.9,2.9]].map(q=>k2P(...q));
 if(C.every(Boolean)){polyFill(g,C,'rgba(205,226,240,0.32)');
  const gl=[[bx,-0.6,3.9],[bx,-0.3,3.9],[bx,-0.75,2.95],[bx,-1.05+0.0,2.95]].map(q=>k2P(...q));if(gl.every(Boolean))polyFill(g,[gl[0],gl[1],gl[2],[gl[2][0]-(gl[1][0]-gl[0][0])*0.6,gl[2][1]]],'rgba(255,255,255,0.12)');
  const fw=Math.max(1,Math.round(C[0][2]*0.04));for(let i=0;i<4;i++){const a=C[i],b=C[(i+1)%4];k2Ln(g,a[0],a[1],b[0],b[1],i===2?'#16181d':'#f4f6f8',fw);}
  const Q=[[bx,-0.3,3.5],[bx,0.3,3.5],[bx,0.3,3.05],[bx,-0.3,3.05]].map(q=>k2P(...q));for(let i=0;i<4;i++){const a=Q[i],b=Q[(i+1)%4];if(a&&b){k2Ln(g,a[0],a[1],b[0],b[1],'#f4f6f8');k2Ln(g,a[0],a[1]+1,b[0],b[1]+1,'#f4f6f8');}}
  const pd=[[bx,-0.92,2.98],[bx,0.92,2.98],[bx,0.92,2.84],[bx,-0.92,2.84]].map(q=>k2P(...q));if(pd.every(Boolean))polyFill(g,pd,kit.p);
  // reloj de posesión arriba del tablero
  const sc=[[bx,-0.32,4.38],[bx,0.32,4.38],[bx,0.32,4.0],[bx,-0.32,4.0]].map(q=>k2P(...q));
  if(sc.every(Boolean)){polyFill(g,sc,'#0b0b0d');const v=Math.max(0,Math.ceil(s.shotClock||0)),str=String(Math.min(99,v)).padStart(2,'0');
   const w=sc[1][0]-sc[0][0],h=sc[3][1]-sc[0][1],ps=Math.max(1,Math.floor(Math.min(Math.abs(w)/9,h/7)));
   if(ps>=1&&Math.abs(w)>8){const tw=7*ps,x0=Math.round((sc[0][0]+sc[1][0])/2-tw/2),y0=Math.round(sc[0][1]+(h-5*ps)/2);g.fillStyle=v<=5?'#ff3b30':'#ff5a3a';
    for(let d=0;d<2;d++){const rows=DIGIT3[str[d]];for(let r=0;r<5;r++)for(let q=0;q<3;q++)if(rows[r][q]==='#')g.fillRect(x0+d*4*ps+q*ps,y0+r*ps,ps,ps);}}}
 }
 // red (malla en rombos) y aro
 const f=hoopFx[String(sd)]||0,shk=f>1?Math.sin(performance.now()/25)*0.03:0;
 const N=16,rim=[],mid=[],bot=[];for(let i=0;i<N;i++){const a=i/N*Math.PI*2;rim.push(k2P(hx+Math.cos(a)*SIM.RIM_R,Math.sin(a)*SIM.RIM_R,RH+shk));
  const sw=Math.sin(t*20+i)*0.02*f;mid.push(k2P(hx+Math.cos(a+0.2)*SIM.RIM_R*0.78,Math.sin(a+0.2)*SIM.RIM_R*0.78,RH-0.22*(1+f*0.4)+sw));bot.push(k2P(hx+Math.cos(a)*SIM.RIM_R*0.58,Math.sin(a)*SIM.RIM_R*0.58,RH-0.46*(1+f*0.5)+sw));}
 const NC='rgba(246,246,240,0.85)',NC2='rgba(200,200,195,0.6)';
 for(let i=0;i<N;i++){const j=(i+1)%N;const a=rim[i],m=mid[i],m2=mid[j],bb=bot[i],b2=bot[j];
  if(a&&m)k2Ln(g,a[0],a[1],m[0],m[1],NC);const a2=rim[j];if(a2&&m)k2Ln(g,a2[0],a2[1],m[0],m[1],NC2);
  if(m&&bb)k2Ln(g,m[0],m[1],bb[0],bb[1],NC2);if(m&&b2)k2Ln(g,m[0],m[1],b2[0],b2[1],NC);}
 const bk=k2P(bx,0,RH),fr=k2P(hx-sd*SIM.RIM_R,0,RH);if(bk&&fr){k2Ln(g,bk[0],bk[1],fr[0],fr[1],'#b8420f');k2Ln(g,bk[0],bk[1]+1,fr[0],fr[1]+1,'#7a2a08');}
 const thick=rim[0]&&rim[0][2]>40;
 for(let i=0;i<N;i++){const a=rim[i],b=rim[(i+1)%N];if(a&&b){k2Ln(g,a[0],a[1],b[0],b[1],'#ff7a2a');k2Ln(g,a[0],a[1]+1,b[0],b[1]+1,'#c4480f');if(thick)k2Ln(g,a[0],a[1]+2,b[0],b[1]+2,'#7a2a08');}}
}

/* ---------- pelota ---------- */
function k2Ball(g,b,t,bp){
 const q=k2P(bp[0],bp[1],bp[2]);if(!q)return;
 const r=Math.max(1.6,SIM.BR*q[2]*1.2),ri=Math.round(r);
 disc(g,q[0],q[1],r+1,'#1a0c04');disc(g,q[0],q[1],r,'#d9661c');disc(g,q[0]-r*0.18,q[1]-r*0.18,r*0.78,'#ea7a2a');disc(g,q[0]-r*0.35,q[1]-r*0.38,Math.max(0.6,r*0.32),'#ffb071');
 if(ri>=2){const ph=(b.roll||0)*1.6+(b.holder<0?t*8:0),cx=Math.round(q[0]),cy=Math.round(q[1]);g.fillStyle='#3a1a08';
  const ox=Math.round(Math.sin(ph)*r*0.55);g.fillRect(cx-ri+1,cy,ri*2-1,1);for(let y=-ri+1;y<ri;y++){const w=Math.sqrt(Math.max(0,1-(y/r)**2));g.fillRect(cx+Math.round(ox*w),cy+y,1,1);}}
}

/* ---------- escena ---------- */
function render2k(dt,W,H){
 const s=game.state,g=pg,K=game.k2,t=performance.now()/1000;g.imageSmoothingEnabled=false;
 const L2=s.L/2,W2=s.W/2,hz=k2P(K.cx+Math.cos(K.yaw)*400,K.cy+Math.sin(K.yaw)*400,0);
 const hy=hz?Math.round(hz[1]):Math.round(PH*0.3);
 // festejo: cambia el marcador → la gente salta y caen papelitos
 const sk=s.score[0]+'-'+s.score[1];if(K.lastScore!==sk){if(K.lastScore!=null){K.cheer=3;k2Confetti(K,s);}K.lastScore=sk;}
 K.cheer=Math.max(0,(K.cheer||0)-dt);
 // techo oscuro con un brillo de las luces
 const gr=g.createLinearGradient(0,0,0,Math.max(1,hy));gr.addColorStop(0,'#05060a');gr.addColorStop(1,'#141822');g.fillStyle=gr;g.fillRect(0,0,PW,Math.max(1,hy));
 k2Floor7(g,hy);
 k2Arena(g,s,t,K.cheer);
 // entidades: primero los reflejos en el parquet y las sombras, después todo ordenado de lejos a cerca
 const b=s.ball,bp=k2BallPos(s),ents=[];
 for(const p of s.players){const q=k2P(p.x,p.y,0);if(!q)continue;const e={d:q[3],p,q};ents.push(e);
  const u=q[2]/12;if(u<0.55||q[2]>220)continue;
  const J=k2Pose(p,s,t),rel=p.face-K.yaw,cw=Math.ceil(16*u)+6,ch=Math.ceil(33*u)+6,C=k2Canvas(p.id,cw,ch);
  C.g.clearRect(0,0,C.c.width,C.c.height);C.g.imageSmoothingEnabled=false;
  const kit=bkit(game.kits[p.team],p);
  k2Fig(C.g,cw/2,ch-Math.ceil(1.6*u)-2,u,J,rel,{kit,skin:SKIN[p.skin|0],hair:p.hair||'#222',num:p.num,band:p.id%3===0?kit.s:null,happy:s.phase==='goal'&&p.team===s.lastGoalTeam});
  e.fig={c:C.c,cw,ch,oy:ch-Math.ceil(1.6*u)-2,u};}
 g.save();g.beginPath();g.rect(0,hy,PW,PH-hy);g.clip();
 for(const e of ents){const q=e.q;
  if(e.fig){const lift=(e.p.jz||0)*q[2];g.globalAlpha=0.2;g.setTransform(1,0,0,-0.9,0,q[1]*1.9);g.drawImage(e.fig.c,0,0,e.fig.cw,e.fig.ch,Math.round(q[0]-e.fig.cw/2),Math.round(q[1]-e.fig.oy-lift),e.fig.cw,e.fig.ch);g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;}
  const rx=Math.max(2,0.5*q[2]),ry=Math.max(1,0.16*q[2]),sa=Math.max(0.15,0.4-(e.p.jz||0)*0.15);ellipseF(g,q[0],q[1],rx,ry,`rgba(0,0,0,${sa})`);}
 {const sq=k2P(bp[0],bp[1],0),bq=k2P(bp[0],bp[1],bp[2]);if(sq&&bq){ellipseF(g,sq[0],sq[1],Math.max(1.5,0.16*sq[2]),Math.max(1,0.06*sq[2]),`rgba(0,0,0,${Math.max(0.1,0.4-b.z*0.08)})`);
  const rr=Math.max(1.2,SIM.BR*bq[2]*1.2),my=sq[1]+(sq[1]-bq[1]);if(my<PH+rr){g.globalAlpha=0.22;disc(g,bq[0],my,rr,'#d9661c');g.globalAlpha=1;}}}
 g.restore();
 // estela de la pelota en el aire
 K.trail=K.trail||[];if(b.holder<0&&(b.z>1.4||b.shot)){K.trail.push([b.x,b.y,b.z]);if(K.trail.length>9)K.trail.shift();}else if(K.trail.length)K.trail.shift();
 ents.push({d:k2Depth(bp[0],bp[1],0)-0.05,ball:true});
 for(const sd of [-1,1])ents.push({d:k2Depth(sd*(s.L/2-SIM.HOOP_OFF),0,0)+0.3,hoop:sd});
 ents.sort((a,c)=>c.d-a.d);
 for(const e of ents){
  if(e.hoop){k2Hoop(g,s,e.hoop,t);continue;}
  if(e.ball){for(let i=0;i<K.trail.length-1;i++){const w=K.trail[i],q=k2P(w[0],w[1],w[2]);if(!q)continue;g.globalAlpha=0.12+i/K.trail.length*0.3;disc(g,q[0],q[1],Math.max(1,SIM.BR*q[2]*(0.5+i/K.trail.length*0.6)),'#ffb071');}g.globalAlpha=1;
   k2Ball(g,b,t,bp);continue;}
  const p=e.p,q=e.q,sc=q[2];if(sc<4)continue;
  const human=game.ctrls[p.id]&&game.ctrls[p.id].type==='human',hcol=human?(game.ctrls[p.id].col||(game.ctrls[p.id].slot===1?'#3fd8ff':'#ff5aa8')):null;
  const lift=(p.jz||0)*sc*Math.cos(K2.PITCH);
  // anillo y energía bajo tu jugador
  if(human&&p===K.me){const rr=0.75;let lp=null;for(let i=0;i<=28;i++){const an=Math.PI*0.12+i/28*Math.PI*0.76;const w=k2P(p.x+Math.cos(K.yaw+an+Math.PI/2)*rr,p.y+Math.sin(K.yaw+an+Math.PI/2)*rr,0);if(w&&lp){const fr=i/28<=p.stam;k2Ln(g,lp[0],lp[1],w[0],w[1],fr?(p.stam>0.3?'#f2f2f2':'#ff5a4f'):'rgba(255,255,255,0.22)');k2Ln(g,lp[0],lp[1]+1,w[0],w[1]+1,fr?(p.stam>0.3?hcol:'#b33'):'rgba(0,0,0,0.3)');}lp=w;}
   if(p.fire){for(let i=0;i<12;i++){const an=i/12*Math.PI*2+t*3,w=k2P(p.x+Math.cos(an)*0.7,p.y+Math.sin(an)*0.7,0.1+Math.abs(Math.sin(t*9+i))*0.35);if(w){g.fillStyle=i%2?'#ffb02e':'#ff5a1f';g.fillRect(Math.round(w[0]),Math.round(w[1]),2,2);}}}}
  else if(human){const w=k2P(p.x,p.y,0);if(w){const r=Math.max(2,0.45*w[2]);ellipseF(g,w[0],w[1],r,r*0.3,hexA(hcol,0.45));}}
  let k=sc/12;
  if(e.fig){const near=sc>110;if(near)g.globalAlpha=Math.max(0.25,1-(sc-110)/80);
   g.drawImage(e.fig.c,0,0,e.fig.cw,e.fig.ch,Math.round(q[0]-e.fig.cw/2),Math.round(q[1]-e.fig.oy-lift),e.fig.cw,e.fig.ch);g.globalAlpha=1;}
  else if(sc<70){// muy lejos: el muñequito chico de siempre
   const rel=p.face-K.yaw,cs=Math.cos(rel),sn=Math.sin(rel);
   const view=cs>0.55?{view:'back',flip:false}:cs<-0.55?{view:'front',flip:false}:{view:'side',flip:sn<0};
   const o=Object.assign({kit:bkit(game.kits[p.team],p),skin:SKIN[p.skin|0],hair:p.hair||'#222',name:p.name,phase:p.run,moving:Math.hypot(p.vx,p.vy)>0.6,num:p.num},view);
   k2sg.clearRect(0,0,40,48);drawFootballer(k2sg,20,44,o);const kk=(2.0*sc)/23;g.drawImage(k2spr,Math.round(q[0]-20*kk),Math.round(q[1]-44*kk-lift),Math.round(40*kk),Math.round(48*kk));}
  if(p.fire){for(let i=0;i<6;i++){g.fillStyle=i%2?'rgba(255,176,46,0.8)':'rgba(255,90,31,0.8)';g.fillRect(Math.round(q[0]-8*k+i*3*k),Math.round(q[1]-lift-24*k-(4+Math.abs(Math.sin(t*11+i))*6)*k),Math.max(1,Math.round(k)),Math.round(5*k));}}
  // medidor de tiro al costado
  if(human&&p.charging){const Hh=Math.round(Math.min(60,22*k)),x0=Math.round(q[0]+9*k),y0=Math.round(q[1]-24*k-lift);const[g0,g1]=SIM.PERF,ch=Math.min(1.2,p.charge),fy=v=>y0+Hh-Math.round(Math.min(1,v)*Hh),inG=ch>=g0&&ch<=g1,late=ch>g1;
   g.fillStyle='#000';g.fillRect(x0-1,y0-1,8,Hh+2);g.fillStyle='#2a2f2b';g.fillRect(x0,y0,6,Hh);g.fillStyle=inG?'#b6ff8a':'#2f8a3c';g.fillRect(x0,fy(g1),6,fy(g0)-fy(g1));
   const tp=fy(ch);g.fillStyle=late?'#ff3b30':inG?'#7dff4f':'#ffe14d';g.fillRect(x0+1,tp,4,y0+Hh-tp);g.fillStyle='#fff';g.fillRect(x0-1,tp,8,1);}
  e.sx=q[0];e.sy=q[1]-27*k-lift;e.human=human;e.hcol=hcol;
 }
 // papelitos que caen del techo
 if(K.conf&&K.conf.length){for(let i=K.conf.length-1;i>=0;i--){const c=K.conf[i];c.t+=dt;c.z-=dt*(1.1+Math.sin(c.t*4+i)*0.4);c.x+=Math.sin(c.t*2+i)*dt*0.6;c.y+=Math.cos(c.t*1.7+i)*dt*0.6;if(c.z<0||c.t>9){K.conf.splice(i,1);continue;}
  const q=k2P(c.x,c.y,c.z);if(!q||q[0]<0||q[0]>PW||q[1]<0||q[1]>PH)continue;const sz=Math.max(1,Math.min(3,Math.round(q[2]*0.06)));g.fillStyle=c.col;g.fillRect(Math.round(q[0]),Math.round(q[1]),Math.floor(c.t*6+i)%2?sz:Math.max(1,sz-1)*2,sz);}}
 // viñeta suave (precalculada)
 if(!k2vig){k2vig=document.createElement('canvas');k2vig.width=PW;k2vig.height=PH;const vx=k2vig.getContext('2d'),vg=vx.createRadialGradient(PW/2,PH*0.55,PH*0.35,PW/2,PH*0.55,PW*0.62);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,0.38)');vx.fillStyle=vg;vx.fillRect(0,0,PW,PH);}
 g.drawImage(k2vig,0,0);
 // compone en pantalla (con temblor en las volcadas) y escribe los nombres nítidos
 fx.shake=Math.max(0,(fx.shake||0)-dt*1.4);
 const sc=Math.min(W/PW,H/PH),shk=fx.shake>0.05?fx.shake*7*sc:0;
 const ox=Math.round((W-PW*sc)/2+(Math.random()-0.5)*shk),oy=Math.round((H-PH*sc)/2+(Math.random()-0.5)*shk);
 sctx.imageSmoothingEnabled=false;sctx.drawImage(pbuf,ox,oy,Math.round(PW*sc),Math.round(PH*sc));
 K.xf={ox,oy,sc};
 const fs=Math.max(13,Math.round(5.5*sc));sctx.font=`${fs}px VT323, monospace`;sctx.textAlign='center';sctx.textBaseline='bottom';
 for(const e of ents){if(!e.p||e.sx==null)continue;const p=e.p,c=game.ctrls[p.id];const label=e.human?(c.label||('P'+c.slot+' '+p.name)):p.name;
  const tx=ox+e.sx*sc,ty=oy+(e.sy-2)*sc;sctx.fillStyle='rgba(0,0,0,.7)';sctx.fillText(label,tx+1,ty+1);sctx.fillStyle=e.human?e.hcol:(p.team===0?'rgba(255,240,170,.9)':'rgba(220,235,255,.9)');sctx.fillText(label,tx,ty);}
 // carteles
 const pf=Math.max(14,Math.round(6*sc));sctx.font=`${pf}px Silkscreen, monospace`;
 for(let i=fx.popups.length-1;i>=0;i--){const q2=fx.popups[i];q2.t+=dt;if(q2.t>1.1){fx.popups.splice(i,1);continue;}const w=k2P(q2.x,q2.y,2.6+q2.t*0.8);if(!w)continue;
  const tx=ox+w[0]*sc,ty=oy+w[1]*sc;sctx.globalAlpha=q2.t>0.75?1-(q2.t-0.75)/0.35:1;sctx.fillStyle='#000';sctx.fillText(q2.text,tx+2,ty+2);sctx.fillStyle=q2.col;sctx.fillText(q2.text,tx,ty);sctx.globalAlpha=1;}
 if(fx.flash>0){sctx.fillStyle=`rgba(255,240,200,${fx.flash*0.5})`;sctx.fillRect(0,0,W,H);fx.flash=Math.max(0,fx.flash-dt*1.6);}
 if(mouseOn()){const mx0=Math.round(mouse.x),my0=Math.round(mouse.y),u=Math.max(2,Math.round(sc));sctx.fillStyle='rgba(0,0,0,.7)';sctx.fillRect(mx0-5*u,my0-u,10*u+u,3*u);sctx.fillRect(mx0-u,my0-5*u,3*u,10*u+u);sctx.fillStyle='#3fd8ff';sctx.fillRect(mx0-5*u,my0,4*u,u);sctx.fillRect(mx0+2*u,my0,4*u,u);sctx.fillRect(mx0,my0-5*u,u,4*u);sctx.fillRect(mx0,my0+2*u,u,4*u);}
 sctx.font=`${Math.max(11,Math.round(4*sc))}px Silkscreen, monospace`;sctx.textAlign='left';sctx.textBaseline='top';sctx.fillStyle='rgba(255,255,255,0.55)';sctx.fillText(touch.on?'CÁMARA 2K':'CÁMARA 2K · V cambia',ox+8*sc,oy+(PH-14)*sc);
}
let k2vig=null;
function k2Confetti(K,s){
 K.conf=K.conf||[];const k=game.kits[s.lastGoalTeam!=null?s.lastGoalTeam:0],cols=[k.p,k.s,'#ffffff','#ffe14d'];
 for(let i=0;i<220;i++)K.conf.push({x:(Math.random()-0.5)*s.L*0.9,y:(Math.random()-0.5)*s.W*0.9,z:6+Math.random()*5,col:cols[i%4],t:Math.random()*0.5});
 if(K.conf.length>500)K.conf.splice(0,K.conf.length-500);
}
const k2spr=document.createElement('canvas');k2spr.width=40;k2spr.height=48;const k2sg=k2spr.getContext('2d');
function mouseWorld(){
 if(cam2kOn()){const K=game.k2;if(!K.xf)return null;const px=(mouse.x-K.xf.ox)/K.xf.sc,py=(mouse.y-K.xf.oy)/K.xf.sc;return k2Floor(px,py);}
 const xf=game&&game.xf;if(!xf||!view)return null;
 const bxp=(mouse.x-xf.ox)/xf.sc,byp=(mouse.y-xf.oy)/xf.sc;
 return[(bxp-view.cx)/view.ppm,(byp-view.cy)/(view.ppm*YC)];
}
addEventListener('keydown',e=>{if((e.code==='KeyV'||e.key==='v'||e.key==='V')&&!e.repeat&&game&&!game.demo&&$('menu').hidden&&!(document.activeElement&&document.activeElement.tagName==='INPUT')){setup.cam2k=!setup.cam2k;save();if(game.k2)game.k2.init=false;popup(setup.cam2k?'CÁMARA 2K':'CÁMARA CLÁSICA',game.state.ball.x,game.state.ball.y,'#9be7ff');}});

if(inviteCode())setup.mode='online';
renderMenu();startDemo();last=performance.now();requestAnimationFrame(frame);
screen.addEventListener('pointerdown',()=>{try{window.focus();}catch(e){}});

/* ===================== MOUSE: apuntar y patear =====================
   P1 apunta con el mouse: la pelota sale hacia donde está la mira, desde cualquier lado del círculo.
   Click izquierdo = patear (mantené para cargar) · click derecho = globo. El teclado sigue andando igual. */
const mouse={seen:false,x:0,y:0,l:false,r:false,wx:0,wy:0};
function mouseOn(){return setup.mouse!==false&&mouse.seen&&!touch.on;}
function mouseWorld_fut(){
 const xf=game&&game.xf;if(!xf||!view)return null;
 const bxp=(mouse.x-xf.ox)/xf.sc,byp=(mouse.y-xf.oy)/xf.sc;
 return[(bxp-view.cx)/view.ppm,(byp-view.cy)/(view.ppm*YC)];
}
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=screen.getBoundingClientRect();if(!r.width)return;
 const k=screen.width/r.width;mouse.x=(e.clientX-r.left)*k;mouse.y=(e.clientY-r.top)*k;
 if(game&&!game.demo&&$('menu').hidden)mouse.seen=true;});
screen.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||!game||game.demo||game.replay)return;try{window.focus();}catch(_){}
 const r=screen.getBoundingClientRect(),k=screen.width/r.width;mouse.x=(e.clientX-r.left)*k;mouse.y=(e.clientY-r.top)*k;mouse.seen=true;
 if(e.button===0)mouse.l=true;else if(e.button===2)mouse.r=true;e.preventDefault();});
addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')return;if(e.button===0)mouse.l=false;else if(e.button===2)mouse.r=false;});
addEventListener('blur',()=>{mouse.l=mouse.r=false;});
screen.addEventListener('pointerdown',()=>{if(game&&game.introT>0)game.introSkip=true;});
screen.addEventListener('contextmenu',e=>{if(game&&!game.demo)e.preventDefault();});

(function setupTouch(){
 const zone=$('tzone'),joy=$('tjoy'),knob=$('tknob'),R=56;
 const setJoy=(x,y)=>{let dx=x-touch.ox,dy=y-touch.oy;const l=Math.hypot(dx,dy);if(l>R){dx*=R/l;dy*=R/l;}touch.mx=dx/R;touch.my=dy/R;knob.style.transform=`translate(${dx}px,${dy}px)`;};
 zone.addEventListener('pointerdown',e=>{e.preventDefault();if(touch.joyId!==null)return;touch.on=true;touch.joyId=e.pointerId;try{zone.setPointerCapture(e.pointerId);}catch(_){}
  const r=$('app').getBoundingClientRect();touch.ox=e.clientX;touch.oy=e.clientY;joy.style.left=(e.clientX-r.left)+'px';joy.style.top=(e.clientY-r.top)+'px';joy.hidden=false;setJoy(e.clientX,e.clientY);});
 zone.addEventListener('pointermove',e=>{if(e.pointerId!==touch.joyId)return;e.preventDefault();setJoy(e.clientX,e.clientY);});
 const endJoy=e=>{if(e.pointerId!==touch.joyId)return;touch.joyId=null;touch.mx=touch.my=0;joy.hidden=true;knob.style.transform='';};
 zone.addEventListener('pointerup',endJoy);zone.addEventListener('pointercancel',endJoy);zone.addEventListener('lostpointercapture',endJoy);
 document.querySelectorAll('#tbtns .tb').forEach(b=>{const n=b.dataset.b;
  b.addEventListener('pointerdown',e=>{e.preventDefault();touch.on=true;touch.held[n]=true;touch.tap[n]=true;b.classList.add('on');try{b.setPointerCapture(e.pointerId);}catch(_){}
   ac();if(AC&&AC.state==='suspended')AC.resume();});
  const up=e=>{touch.held[n]=false;b.classList.remove('on');};
  b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);b.addEventListener('lostpointercapture',up);
  b.addEventListener('contextmenu',e=>e.preventDefault());});
 $('tpause').addEventListener('pointerdown',e=>{e.preventDefault();togglePause();});
 const pick=$('chatPick');pick.innerHTML=CHAT_QUICK.map((q,i)=>`<button type="button" data-q="${i}">${q}</button>`).join('');
 $('tchat').addEventListener('pointerdown',e=>{e.preventDefault();pick.hidden=!pick.hidden;});
 pick.querySelectorAll('[data-q]').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();netChat(CHAT_QUICK[+b.dataset.q]);pick.hidden=true;}));
 $('touch').addEventListener('touchmove',e=>e.preventDefault(),{passive:false});
 // pantalla completa (si el navegador lo permite) y bloqueo en horizontal
 const fs=$('btnFull');fs.hidden=!(document.fullscreenEnabled&&touch.on);
 fs.onclick=()=>{const el=document.documentElement;if(!el.requestFullscreen)return;el.requestFullscreen().then(()=>{try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(()=>{});}catch(_){}}).catch(()=>{});togglePause();};
})();
function updateTouchUI(){
 const playing=!!(game&&!game.demo&&!game.paused&&$('end').hidden&&$('menu').hidden&&$('tour').hidden&&(game.state.phase!=='end'||game.pens));
 const show=touch.on&&playing&&!game.replay;
 const el=$('touch');if(el.hidden===show){el.hidden=!show;document.body.classList.toggle('touching',show);}
 if(!show&&touch.joyId!==null){touch.joyId=null;touch.mx=touch.my=0;$('tjoy').hidden=true;}
 if(!show){for(const n in touch.held)touch.held[n]=false;document.querySelectorAll('#tbtns .tb.on').forEach(b=>b.classList.remove('on'));}
 // en penales la barrida/globo/sprint no se usan
 const pens=!!(game&&game.pens);{const sw=document.querySelector('.tb-swap');if(sw)sw.hidden=pens||!(game&&!game.net&&!game.demo&&setup.swap==='btn');const pb=document.querySelector('.tb-pass');if(pb)pb.hidden=pens;}
 for(const n of ['lob','slide','sprint','skill']){const b=document.querySelector('.tb-'+n);if(b)b.hidden=pens;}
 // con el arquero, el globo agarra y la barrida es la estirada
 if(show&&!pens){const me=game.state.players.find(q=>game.ctrls[q.id].type==='human'&&game.ctrls[q.id].slot===1),gk=!!(me&&me.role==='gk');
  if(touch.gk!==gk){touch.gk=gk;document.querySelector('.tb-lob').textContent='ALLEY';document.querySelector('.tb-slide').textContent='ROBAR';}document.querySelector('.tb-skill').hidden=gk;}
 $('rotate').hidden=!(touch.on&&playing&&innerHeight>innerWidth);
 {const on=!!(show&&game&&game.net);$('tchat').hidden=!on;if(!on)$('chatPick').hidden=true;}
}
// acceso de solo lectura para diagnosticar desde la consola del navegador
window.picadito={get SIM(){return SIM;},poseSheet(list){const cv=document.createElement('canvas');cv.width=list.length*20+10;cv.height=40;const g=cv.getContext('2d');g.fillStyle='#2f7d36';g.fillRect(0,0,cv.width,40);const t=TEAMS[0];list.forEach((o,i)=>drawFootballer(g,12+i*20,34,Object.assign({kit:t.kit,skin:SKIN[1],hair:'#15100c',name:'Ana',num:10},o)));return cv.toDataURL();},toScreen(x,y){const xf=game&&game.xf;if(!xf)return null;const q=P(x,y,0),r=screen.getBoundingClientRect(),k=screen.width/r.width;return[(xf.ox+q[0]*xf.sc)/k+r.left,(xf.oy+q[1]*xf.sc)/k+r.top];},get state(){return game&&game.state;},get net(){return NET;},get game(){return game;},get keys(){return[...keys];},get touch(){return touch;},get pens(){return game&&game.pens?{phase:game.pens.phase,res:game.pens.res,cur:game.pens.cur&&{phase:game.pens.cur.phase,cam:game.pens.cur.cam,hs:game.pens.cur.hs,hk:game.pens.cur.hk,result:game.pens.cur.result,dive:game.pens.cur.dive}}:null;}};
}
