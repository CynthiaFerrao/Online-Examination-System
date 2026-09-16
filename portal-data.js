(function(){
'use strict';
const K={exams:'examPortalExams',students:'examPortalStudents',examiners:'examPortalExaminers',users:'examPortalUsers',results:'examResults',profile:'examPortalProfile'};
const AI={date:'2026-09-20',time:'14:00'};
const defaultExams=[
{id:'se',name:'Software Engineering',date:'',time:'',duration:30,questions:5,status:'Live',anytime:true,cancelled:false},
{id:'ai',name:'Artificial Intelligence',date:AI.date,time:AI.time,duration:30,questions:5,status:'Upcoming',anytime:false,cancelled:false},
{id:'math',name:'Honours in Mathematics',date:'2026-09-30',time:'10:00',duration:45,questions:25,status:'Upcoming',anytime:false,cancelled:false},
{id:'dbms',name:'Database Management Systems',date:'2026-09-10',time:'11:00',duration:40,questions:20,status:'Completed',anytime:false,cancelled:false}
];
const defaultStudents=[
{name:'Cynthia Ferrao',id:'XIE2026CS01',department:'Computer Engineering',year:'Second Year',status:'Active'},
{name:'Riya Shah',id:'XIE2026CS02',department:'Computer Engineering',year:'Second Year',status:'Active'},
{name:'Yash Patil',id:'XIE2026CS03',department:'Information Technology',year:'Second Year',status:'Active'},
{name:'Aarav Mehta',id:'XIE2026CS04',department:'Electronics Engineering',year:'Third Year',status:'Active'},
{name:'Ishita Sharma',id:'XIE2026CS05',department:'Computer Engineering',year:'Third Year',status:'Active'},
{name:'Kabir Desai',id:'XIE2026CS06',department:'Information Technology',year:'Third Year',status:'Active'},
{name:'Neha Kulkarni',id:'XIE2026CS07',department:'Computer Engineering',year:'Fourth Year',status:'Active'},
{name:'Aditya Joshi',id:'XIE2026CS08',department:'Electronics Engineering',year:'Fourth Year',status:'Active'},
{name:'Meera Nair',id:'XIE2026CS09',department:'Information Technology',year:'Fourth Year',status:'Active'}
];
const defaultExaminers=[
{name:'Cynthia Ferrao',id:'EX001',department:'Computer Engineering',exams:'06',status:'Active'},
{name:'Dr. Priya Sharma',id:'EX002',department:'Information Technology',exams:'04',status:'Active'},
{name:'Sarvesh Kulkarni',id:'EX003',department:'Computer Engineering',exams:'05',status:'Active'}
];
const defaultResults=[
{student:'Cynthia Ferrao',exam:'Software Engineering',score:86,total:100,status:'Evaluated',date:'2026-09-08'},
{student:'Riya Shah',exam:'Software Engineering',score:91,total:100,status:'Evaluated',date:'2026-09-08'},
{student:'Yash Patil',exam:'Software Engineering',score:79,total:100,status:'Evaluated',date:'2026-09-08'},
{student:'Aarav Mehta',exam:'Artificial Intelligence',score:88,total:100,status:'Evaluated',date:'2026-09-12'},
{student:'Ishita Sharma',exam:'Artificial Intelligence',score:90,total:100,status:'Evaluated',date:'2026-09-12'},
{student:'Kabir Desai',exam:'Honours in Mathematics',score:76,total:100,status:'Evaluated',date:'2026-09-14'},
{student:'Neha Kulkarni',exam:'Honours in Mathematics',score:84,total:100,status:'Evaluated',date:'2026-09-14'},
{student:'Aditya Joshi',exam:'Database Management Systems',score:81,total:100,status:'Evaluated',date:'2026-09-10'},
{student:'Meera Nair',exam:'Database Management Systems',score:93,total:100,status:'Evaluated',date:'2026-09-10'},
{student:'Cynthia Ferrao',exam:'Artificial Intelligence',score:82,total:100,status:'Evaluated',date:'2026-09-12'}
];
function clone(x){return JSON.parse(JSON.stringify(x));}
function read(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?clone(d):v}catch(e){return clone(d)}}
function write(k,v){localStorage.setItem(k,JSON.stringify(v));}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function dateText(v){if(!v)return 'Available Anytime'; const [y,m,d]=v.split('-'); const names=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return `${d} ${names[Number(m)-1]} ${y}`;}
function timeText(v){if(!v)return '—';let [h,m]=v.split(':');h=Number(h);const ap=h>=12?'PM':'AM';h=h%12||12;return `${h}:${m} ${ap}`;}
function status(e){if(e.cancelled)return 'Cancelled';if(e.anytime)return 'Live';if(e.id==='ai'){e.date=AI.date;e.time=AI.time;}if(!e.date)return 'Live';return new Date(e.date+'T'+(e.time||'00:00'))>new Date()?'Upcoming':'Completed';}
function exams(){const a=read(K.exams,defaultExams);a.forEach(e=>{if(e.id==='ai'){e.date=AI.date;e.time=AI.time;e.anytime=false;} if(!e.cancelled)e.status=status(e);});write(K.exams,a);return a;}
function init(){
 let x=read(K.exams,[]);
 // Keep exactly one exam record per exam name. This also cleans duplicates
 // left by earlier versions of the project in browser localStorage.
 const seenExamNames=new Set();
 x=x.filter(e=>{const key=String(e.name||'').trim().toLowerCase();if(!key||seenExamNames.has(key))return false;seenExamNames.add(key);return true;});
 defaultExams.forEach(d=>{const key=d.name.trim().toLowerCase();if(!seenExamNames.has(key)){x.push(clone(d));seenExamNames.add(key);}});
 // The fixed AI schedule must always remain unchanged.
 const ai=x.find(e=>e.id==='ai'||String(e.name||'').trim().toLowerCase()==='artificial intelligence');
 if(ai){ai.id='ai';ai.name='Artificial Intelligence';ai.date=AI.date;ai.time=AI.time;ai.anytime=false;ai.cancelled=false;}
 write(K.exams,x);

 let s=read(K.students,[]);
 defaultStudents.forEach(d=>{if(!s.some(v=>v.id===d.id))s.push(clone(d));});
 write(K.students,s);

 let e=read(K.examiners,[]);
 defaultExaminers.forEach(d=>{if(!e.some(v=>v.id===d.id))e.push(clone(d));});
 write(K.examiners,e);

 let r=read(K.results,[]);
 defaultResults.forEach(d=>{if(!r.some(v=>v.student===d.student&&v.exam===d.exam&&v.date===d.date&&v.score===d.score))r.push(clone(d));});
 write(K.results,r);

 let u=read(K.users,[]);
 const defaultUsers=[...defaultStudents.map(v=>({name:v.name,id:v.id,role:'Student',status:v.status})),...defaultExaminers.map(v=>({name:v.name,id:v.id,role:'Examiner',status:v.status})),{name:'Administrator',id:'USR003',role:'Administrator',status:'Active'}];
 defaultUsers.forEach(d=>{if(!u.some(v=>v.id===d.id))u.push(clone(d));});
 write(K.users,u);
}
function changed(){window.dispatchEvent(new Event('examPortalDataChanged'));}
function today(){return new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'});}
function setDate(id){const e=document.getElementById(id);if(e)e.textContent=today();}
function rowStatus(c){return c==='Cancelled'?'cancelled-status':c==='Live'?'active-status':'scheduled-status';}

function adminDash(){
 setDate('currentAdminDate');
 const s=read(K.students,defaultStudents),e=read(K.examiners,defaultExaminers),x=exams();
 const cards=document.querySelectorAll('#dashboardSection .stats-grid .stat-card strong');
 if(cards.length>=4){cards[0].textContent=s.length;cards[1].textContent=e.length;cards[2].textContent=x.filter(a=>!a.cancelled).length;cards[3].textContent=x.filter(a=>a.status==='Live'&&a.date&&a.id!=='se').length;}
 const rows=document.querySelectorAll('#dashboardSection .results-card .result-row:not(.result-head)');
 if(rows.length>=3){rows[0].children[1].textContent=s.length;rows[0].children[2].textContent=s.filter(a=>a.status==='Active').length;rows[1].children[1].textContent=e.length;rows[1].children[2].textContent=e.filter(a=>a.status==='Active').length;rows[2].children[1].textContent=x.filter(a=>!a.cancelled).length;rows[2].children[2].textContent=x.filter(a=>a.status==='Live'&&!a.cancelled).length;}
}
function renderStudents(){const tb=document.querySelector('#studentTable tbody');if(!tb)return;tb.innerHTML=read(K.students,defaultStudents).map((s,i)=>`<tr data-id="${esc(s.id)}"><td>${esc(s.name)}</td><td>${esc(s.id)}</td><td>${esc(s.department)}</td><td>${esc(s.year)}</td><td><span class="${s.status==='Active'?'active-status':'cancelled-status'}">${esc(s.status)}</span></td><td><div class="table-actions"><button class="secondary-btn" onclick="viewStudent(this)">View</button><button class="secondary-btn" onclick="manageStudent(this)">Manage</button></div></td></tr>`).join('');}
function renderExaminers(){const tb=document.querySelector('#examinerTable tbody');if(!tb)return;tb.innerHTML=read(K.examiners,defaultExaminers).map(s=>`<tr data-id="${esc(s.id)}"><td>${esc(s.name)}</td><td>${esc(s.id)}</td><td>${esc(s.department)}</td><td>${esc(s.exams)}</td><td><span class="${s.status==='Active'?'active-status':'cancelled-status'}">${esc(s.status)}</span></td><td><div class="table-actions"><button class="secondary-btn" onclick="viewExaminer(this)">View</button><button class="secondary-btn" onclick="manageExaminer(this)">Manage</button></div></td></tr>`).join('');}
function renderUsers(){const tb=document.querySelector('#userTable tbody');if(!tb)return;tb.innerHTML=read(K.users,[]).map(s=>`<tr data-role="${esc(s.role).toLowerCase()}" data-id="${esc(s.id)}"><td>${esc(s.name)}</td><td>${esc(s.role)}</td><td>${esc(s.id)}</td><td><span class="${s.status==='Active'?'active-status':'cancelled-status'}">${esc(s.status)}</span></td><td><div class="table-actions"><button class="secondary-btn" onclick="viewUser(this)">View</button><button class="secondary-btn" onclick="manageUser(this)">Manage</button></div></td></tr>`).join('');}
function renderAdminExams(){const tb=document.getElementById('examTableBody');if(!tb)return;tb.innerHTML=exams().map(e=>`<tr data-id="${esc(e.id)}"><td>${esc(e.name)}</td><td>${e.anytime?'Anytime':dateText(e.date)}</td><td>${e.anytime?'—':timeText(e.time)}</td><td>${e.duration} min</td><td>${e.questions}</td><td><span class="${rowStatus(e.status)}">${esc(e.status)}</span></td><td><div class="table-actions"><button class="secondary-btn" onclick="viewExam(this)">View</button><button class="secondary-btn" onclick="manageExam(this)">Manage</button></div></td></tr>`).join('');}
function findByRow(btn,k){const r=btn.closest('tr');const id=r?.dataset.id;return [r,id,read(k,[]).find(x=>x.id===id)];}
function ensureAddForms(){
 const st=document.getElementById('studentsSection');
 if(st && !document.getElementById('addStudentForm')){
  const toolbar=st.querySelector('.admin-toolbar');
  const f=document.createElement('div'); f.id='addStudentForm'; f.className='admin-form-card'; f.style.display='none';
  f.innerHTML=`<h3>Add New Student</h3><div class="form-grid">
   <div class="form-group"><label>Student Name</label><input id="addStudentName" type="text" placeholder="Enter student name"></div>
   <div class="form-group"><label>Student ID</label><input id="addStudentId" type="text" placeholder="e.g. XIE2026CS10"></div>
   <div class="form-group"><label>Department</label><input id="addStudentDepartment" type="text" placeholder="Enter department"></div>
   <div class="form-group"><label>Year</label><select id="addStudentYear"><option>Second Year</option><option>Third Year</option><option>Fourth Year</option></select></div>
  </div><div class="form-actions"><button class="primary-btn" onclick="saveNewStudent()">Add Student</button><button class="secondary-btn" onclick="hideAddForm('addStudentForm')">Cancel</button></div>`;
  toolbar?.after(f);
 }
 const ex=document.getElementById('examinersSection');
 if(ex && !document.getElementById('addExaminerForm')){
  const toolbar=ex.querySelector('.admin-toolbar');
  const f=document.createElement('div'); f.id='addExaminerForm'; f.className='admin-form-card'; f.style.display='none';
  f.innerHTML=`<h3>Add New Examiner</h3><div class="form-grid">
   <div class="form-group"><label>Examiner Name</label><input id="addExaminerName" type="text" placeholder="Enter examiner name"></div>
   <div class="form-group"><label>Employee ID</label><input id="addExaminerId" type="text" placeholder="e.g. EX004"></div>
   <div class="form-group"><label>Department</label><input id="addExaminerDepartment" type="text" placeholder="Enter department"></div>
   <div class="form-group"><label>Assigned Exams</label><input id="addExaminerExams" type="number" min="0" placeholder="0"></div>
  </div><div class="form-actions"><button class="primary-btn" onclick="saveNewExaminer()">Add Examiner</button><button class="secondary-btn" onclick="hideAddForm('addExaminerForm')">Cancel</button></div>`;
  toolbar?.after(f);
 }
 const us=document.getElementById('usersSection');
 if(us && !document.getElementById('addUserForm')){
  const toolbar=us.querySelector('.admin-toolbar');
  if(toolbar){const b=document.createElement('button');b.className='primary-btn';b.textContent='+ Add User';b.onclick=()=>showAddUserForm();toolbar.appendChild(b);}
  const f=document.createElement('div'); f.id='addUserForm'; f.className='admin-form-card'; f.style.display='none';
  f.innerHTML=`<h3>Add New User</h3><div class="form-grid">
   <div class="form-group"><label>Name</label><input id="addUserName" type="text" placeholder="Enter user name"></div>
   <div class="form-group"><label>User ID</label><input id="addUserId" type="text" placeholder="Enter user ID"></div>
   <div class="form-group"><label>Role</label><select id="addUserRole"><option>Student</option><option>Examiner</option><option>Administrator</option></select></div>
   <div class="form-group"><label>Status</label><select id="addUserStatus"><option>Active</option><option>Inactive</option></select></div>
  </div><div class="form-actions"><button class="primary-btn" onclick="saveNewUser()">Add User</button><button class="secondary-btn" onclick="hideAddForm('addUserForm')">Cancel</button></div>`;
  toolbar?.after(f);
 }
}
function hideAddForm(id){const f=document.getElementById(id);if(f)f.style.display='none';}
function addStudent(){ensureAddForms();const f=document.getElementById('addStudentForm');if(f){f.style.display='block';f.scrollIntoView({behavior:'smooth',block:'nearest'});}}
function saveNewStudent(){
 const name=document.getElementById('addStudentName')?.value.trim(),id=document.getElementById('addStudentId')?.value.trim(),dep=document.getElementById('addStudentDepartment')?.value.trim(),year=document.getElementById('addStudentYear')?.value;
 if(!name||!id||!dep||!year)return alert('Please fill in all required student details.');
 const a=read(K.students,[]);if(a.some(x=>x.id.toLowerCase()===id.toLowerCase()))return alert('A student with this ID already exists.');
 a.push({name,id,department:dep,year,status:'Active'});write(K.students,a);const u=read(K.users,[]);u.push({name,id,role:'Student',status:'Active'});write(K.users,u);renderStudents();renderUsers();adminDash();changed();hideAddForm('addStudentForm');alert('Student added successfully.');
}
function addExaminer(){ensureAddForms();const f=document.getElementById('addExaminerForm');if(f){f.style.display='block';f.scrollIntoView({behavior:'smooth',block:'nearest'});}}
function saveNewExaminer(){
 const name=document.getElementById('addExaminerName')?.value.trim(),id=document.getElementById('addExaminerId')?.value.trim(),dep=document.getElementById('addExaminerDepartment')?.value.trim(),cnt=document.getElementById('addExaminerExams')?.value.trim()||'0';
 if(!name||!id||!dep)return alert('Please fill in all required examiner details.');
 const a=read(K.examiners,[]);if(a.some(x=>x.id.toLowerCase()===id.toLowerCase()))return alert('An examiner with this ID already exists.');
 a.push({name,id,department:dep,exams:String(Number(cnt)||0).padStart(2,'0'),status:'Active'});write(K.examiners,a);const u=read(K.users,[]);u.push({name,id,role:'Examiner',status:'Active'});write(K.users,u);renderExaminers();renderUsers();adminDash();changed();hideAddForm('addExaminerForm');alert('Examiner added successfully.');
}
function showAddUserForm(){ensureAddForms();const f=document.getElementById('addUserForm');if(f){f.style.display='block';f.scrollIntoView({behavior:'smooth',block:'nearest'});}}
function saveNewUser(){
 const name=document.getElementById('addUserName')?.value.trim(),id=document.getElementById('addUserId')?.value.trim(),role=document.getElementById('addUserRole')?.value,statusv=document.getElementById('addUserStatus')?.value;
 if(!name||!id)return alert('Please fill in all required user details.');
 const u=read(K.users,[]);if(u.some(x=>x.id.toLowerCase()===id.toLowerCase()))return alert('A user with this ID already exists.');u.push({name,id,role,status:statusv});write(K.users,u);
 if(role==='Student'){const a=read(K.students,[]);a.push({name,id,department:'Computer Engineering',year:'Second Year',status:statusv});write(K.students,a);}
 if(role==='Examiner'){const a=read(K.examiners,[]);a.push({name,id,department:'Computer Engineering',exams:'00',status:statusv});write(K.examiners,a);}
 renderUsers();renderStudents();renderExaminers();adminDash();changed();hideAddForm('addUserForm');alert('User added successfully.');
}
function manageStudent(btn){const [r,,s]=findByRow(btn,K.students);if(!s)return;window._studentId=s.id;document.getElementById('manageStudentName').value=s.name;document.getElementById('manageStudentId').value=s.id;document.getElementById('manageStudentDepartment').value=s.department;document.getElementById('manageStudentYear').value=s.year;document.getElementById('studentStatusButton').textContent=s.status;showSection('manageStudent');}
function saveStudentChanges(){const old=window._studentId,a=read(K.students,[]),s=a.find(x=>x.id===old);if(!s)return;const name=document.getElementById('manageStudentName').value.trim(),id=document.getElementById('manageStudentId').value.trim();if(!name||!id)return alert('Please fill in all required fields.');s.name=name;s.id=id;s.department=document.getElementById('manageStudentDepartment').value;s.year=document.getElementById('manageStudentYear').value;s.status=document.getElementById('studentStatusButton').textContent.trim();write(K.students,a);syncUser(old,s,'Student');renderStudents();renderUsers();adminDash();changed();alert('Student details updated successfully.');showSection('students');}
function changeManagedStatus(role){const b=document.getElementById(role==='examiner'?'examinerStatusButton':'studentStatusButton');if(b)b.textContent=b.textContent.trim()==='Active'?'Inactive':'Active';}
function manageExaminer(btn){const [r,,s]=findByRow(btn,K.examiners);if(!s)return;window._examinerId=s.id;document.getElementById('manageExaminerName').value=s.name;document.getElementById('manageExaminerId').value=s.id;document.getElementById('manageExaminerDepartment').value=s.department;document.getElementById('manageExaminerExams').value=s.exams;document.getElementById('examinerStatusButton').textContent=s.status;showSection('manageExaminer');}
function saveExaminerChanges(){const old=window._examinerId,a=read(K.examiners,[]),s=a.find(x=>x.id===old);if(!s)return;const name=document.getElementById('manageExaminerName').value.trim(),id=document.getElementById('manageExaminerId').value.trim();if(!name||!id)return alert('Please fill in all required fields.');s.name=name;s.id=id;s.department=document.getElementById('manageExaminerDepartment').value;s.exams=document.getElementById('manageExaminerExams').value;s.status=document.getElementById('examinerStatusButton').textContent.trim();write(K.examiners,a);syncUser(old,s,'Examiner');renderExaminers();renderUsers();adminDash();changed();alert('Examiner details updated successfully.');showSection('examiners');}
function changeExaminerStatus(){const b=document.getElementById('examinerStatusButton');if(b)b.textContent=b.textContent.trim()==='Active'?'Inactive':'Active';}
function syncUser(old,p,role){const u=read(K.users,[]),x=u.find(a=>a.id===old&&a.role===role);if(x)Object.assign(x,{id:p.id,name:p.name,status:p.status});write(K.users,u);}
function viewStudent(btn){const [r,,s]=findByRow(btn,K.students);if(!s)return;details('Student Details','Registered student information',s.name,'Student',s.id,s.department,'—','—','—','Student');}
function viewExaminer(btn){const [r,,s]=findByRow(btn,K.examiners);if(!s)return;details('Examiner Details','Registered examiner information',s.name,'Examiner',s.id,s.department,'—','—',s.exams,'Assigned Exams');}
function viewUser(btn){const [r,,u]=findByRow(btn,K.users);if(!u)return;details('User Details','Registered system user information',u.name,u.role,u.id,'ExamPortal','—','—','—','System User');}
function details(t,sub,n,type,id,dep,date,time,dur,q){document.getElementById('detailTitle').textContent=t;document.getElementById('detailSubtitle').textContent=sub;document.getElementById('detailName').textContent=n;document.getElementById('detailType').textContent=type;document.getElementById('detailId').textContent=id;document.getElementById('detailDepartment').textContent=dep;document.getElementById('detailDate').textContent=date;document.getElementById('detailTime').textContent=time;document.getElementById('detailDuration').textContent=dur;document.getElementById('detailQuestions').textContent=q;document.getElementById('detailStatus').textContent='Active';showSection('details');}
function viewExam(btn){if(typeof btn==='string'){return viewExaminerExam(btn);}const [,id]=findByRow(btn,K.exams);const e=exams().find(x=>x.id===id);if(!e)return;details('Examination Details','Configured examination information',e.name,'Mid-Semester Examination',e.id,'ExamPortal',e.anytime?'Available Anytime':dateText(e.date),e.anytime?'—':timeText(e.time),e.duration+' Minutes',e.questions);document.getElementById('detailStatus').textContent=e.status;}
function manageExam(btn){const [,id]=findByRow(btn,K.exams);const e=exams().find(x=>x.id===id);if(!e)return;window._examId=e.id;document.getElementById('manageExamName').value=e.name;document.getElementById('manageExamDate').value=e.date||'';document.getElementById('manageExamTime').value=e.time||'';document.getElementById('manageExamDuration').value=e.duration;document.getElementById('manageExamQuestions').value=e.questions;showSection('manageExam');}
function saveExamChanges(){const id=window._examId,a=read(K.exams,[]),e=a.find(x=>x.id===id);if(!e)return;if(id==='ai')return alert('The Artificial Intelligence exam is fixed for 20 September 2026 at 2:00 PM.');const n=document.getElementById('manageExamName').value.trim(),d=document.getElementById('manageExamDate').value,t=document.getElementById('manageExamTime').value;if(!n)return alert('Please fill in all required fields.');Object.assign(e,{name:n,date:d,time:t,duration:Number(document.getElementById('manageExamDuration').value)||30,questions:Number(document.getElementById('manageExamQuestions').value)||5,anytime:!d,cancelled:false});write(K.exams,a);renderAdminExams();adminDash();changed();alert('Examination details updated successfully.');showSection('exams');}
function cancelManagedExam(){const id=window._examId,a=read(K.exams,[]),e=a.find(x=>x.id===id);if(!e)return;if(id==='ai')return alert('The Artificial Intelligence exam is fixed for 20 September 2026 at 2:00 PM.');if(!confirm('Are you sure you want to cancel '+e.name+'?'))return;e.cancelled=true;e.status='Cancelled';write(K.exams,a);renderAdminExams();adminDash();changed();alert(e.name+' has been cancelled successfully.');showSection('exams');}
function scheduleAdminExam(){const n=document.getElementById('newExamName').value.trim(),d=document.getElementById('newExamDate').value,t=document.getElementById('newExamTime').value;if(!n||!d)return alert('Please fill in all required examination details.');if(n.toLowerCase()==='artificial intelligence')return alert('The Artificial Intelligence exam is fixed for 20 September 2026 at 2:00 PM.');const a=exams();if(a.some(e=>String(e.name||'').trim().toLowerCase()===n.toLowerCase()))return alert('An examination with this name already exists.');a.push({id:'exam_'+Date.now(),name:n,date:d,time:t,duration:Number(document.getElementById('newExamDuration').value)||30,questions:Number(document.getElementById('newExamQuestions').value)||5,anytime:false,status:'Upcoming',cancelled:false});write(K.exams,a);renderAdminExams();adminDash();changed();['newExamName','newExamDate','newExamTime'].forEach(i=>document.getElementById(i).value='');alert('Examination scheduled successfully.');hideScheduleForm();}
function filterUsers(role){document.querySelectorAll('#userTable tbody tr').forEach(r=>r.style.display=role==='all'||r.dataset.role===role?'':'none');}
function searchTable(id,v){const q=String(v||'').toLowerCase();document.querySelectorAll('#'+id+' tbody tr').forEach(r=>r.style.display=r.textContent.toLowerCase().includes(q)?'':'none');}

function examinerDash(){setDate('currentDashboardDate');const x=exams(),r=read(K.results,defaultResults),cards=document.querySelectorAll('#dashboardSection .stats-grid .stat-card strong');if(cards.length>=4){cards[0].textContent=x.filter(e=>!e.cancelled).length;cards[1].textContent=x.filter(e=>e.status==='Upcoming'&&!e.cancelled).length;cards[2].textContent=x.filter(e=>e.status==='Completed'&&!e.cancelled).length;cards[3].textContent=r.length;}const list=document.getElementById('dashboardExamList');if(list)list.innerHTML=x.map(e=>`<div class="exam-card-dashboard${e.cancelled?' cancelled-card':''}"><div class="exam-main"><div class="exam-icon">${esc(e.name.slice(0,2).toUpperCase())}</div><div class="exam-info"><div class="exam-title-row"><h3>${esc(e.name)}</h3><span class="status ${e.status==='Live'?'available':e.cancelled?'cancelled-status':'upcoming'}">${esc(e.status)}</span></div><p>Mid-Semester Examination</p><div class="exam-meta"><span>${e.anytime?'◷ Available Anytime':'◷ '+dateText(e.date)+(e.time?', '+timeText(e.time):'')}</span><span>◫ ${e.duration} Minutes</span><span>▣ ${e.questions} Questions</span></div></div></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="outline-btn" onclick="viewExaminerExam('${esc(e.id)}')">View</button>${e.cancelled?'':`<button class="outline-btn" onclick="openPostpone('${esc(e.id)}')">Postpone</button><button class="start-btn" onclick="cancelSelectedExam('${esc(e.id)}')">Cancel</button>`}</div></div>`).join('');}
function saveNewExam(){const n=document.getElementById('newExamName')?.value.trim(),d=document.getElementById('newExamDate')?.value,t=document.getElementById('newExamTime')?.value;if(!n||!d)return alert('Please fill in all required examination details.');if(n.toLowerCase()==='artificial intelligence')return alert('The Artificial Intelligence exam is fixed for 20 September 2026 at 2:00 PM.');const a=exams();if(a.some(e=>String(e.name||'').trim().toLowerCase()===n.toLowerCase()))return alert('An examination with this name already exists.');a.push({id:'exam_'+Date.now(),name:n,date:d,time:t,duration:Number(document.getElementById('newExamDuration').value)||30,questions:Number(document.getElementById('newExamQuestions').value)||5,anytime:false,status:'Upcoming',cancelled:false});write(K.exams,a);examinerDash();renderExaminerExams();adminDash();changed();alert('Examination scheduled successfully.');showSection('examsSection');}
function renderExaminerExams(){const x=exams(),c=document.getElementById('allExamList');if(c)c.innerHTML=x.map(e=>`<div class="exam-card-dashboard"><div class="exam-main"><div class="exam-icon">${esc(e.name.slice(0,2).toUpperCase())}</div><div class="exam-info"><div class="exam-title-row"><h3>${esc(e.name)}</h3><span class="status ${e.status==='Live'?'available':e.cancelled?'cancelled-status':'upcoming'}">${esc(e.status)}</span></div><p>Mid-Semester Examination</p><div class="exam-meta"><span>${e.anytime?'◷ Available Anytime':'◷ '+dateText(e.date)+(e.time?', '+timeText(e.time):'')}</span><span>◫ ${e.duration} Minutes</span><span>▣ ${e.questions} Questions</span></div></div></div></div>`).join('');}
function viewExaminerExam(id){const e=exams().find(x=>x.id===id);if(!e)return;document.getElementById('detailsExamName').textContent=e.name;document.getElementById('detailsDate').textContent=e.anytime?'Available Anytime':dateText(e.date);document.getElementById('detailsTime').textContent=e.anytime?'—':timeText(e.time);document.getElementById('detailsDuration').textContent=e.duration+' Minutes';document.getElementById('detailsQuestions').textContent=e.questions;document.getElementById('detailsStatus').textContent=e.status;showSection('detailsSection');}
function openPostpone(id){const e=exams().find(x=>x.id===id);if(!e||id==='ai')return alert(id==='ai'?'The Artificial Intelligence exam is fixed for 20 September 2026 at 2:00 PM.':'Exam not found.');window._postponeId=id;document.getElementById('postponeExamName').textContent=e.name;document.getElementById('postponeDate').value=e.date||'';document.getElementById('postponeTime').value=e.time||'';showSection('postponeFormSection');}
function savePostponedExam(){const a=read(K.exams,[]),e=a.find(x=>x.id===window._postponeId);if(!e)return;if(e.id==='ai')return alert('The Artificial Intelligence exam is fixed for 20 September 2026 at 2:00 PM.');e.date=document.getElementById('postponeDate').value;e.time=document.getElementById('postponeTime').value;e.status='Upcoming';write(K.exams,a);examinerDash();renderExaminerExams();adminDash();changed();alert('Examination postponed successfully.');showSection('examsSection');}
function openScheduleForm(){const f=document.getElementById('scheduleFormSection');if(f)showSection('scheduleFormSection');}
function cancelSelectedExam(id){const a=read(K.exams,[]),e=a.find(x=>x.id===id);if(!e)return;if(id==='ai')return alert('The Artificial Intelligence exam is fixed for 20 September 2026 at 2:00 PM.');if(!confirm('Are you sure you want to cancel '+e.name+'?'))return;e.cancelled=true;e.status='Cancelled';write(K.exams,a);examinerDash();renderExaminerExams();adminDash();changed();alert(e.name+' has been cancelled successfully.');}
function renderExaminerTables(){const r=read(K.results,defaultResults).filter(v=>v&&v.student&&v.exam&&v.score!==undefined&&v.total!==undefined&&v.status);document.querySelectorAll('#submissionsSection .result-row:not(.result-head), #resultsSection .result-row:not(.result-head)').forEach(x=>x.remove());r.sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));['submissionsSection','resultsSection'].forEach(id=>{const sec=document.getElementById(id);if(!sec)return;const card=sec.querySelector('.results-card');if(!card)return;r.forEach(v=>{const row=document.createElement('div');row.className='result-row';row.innerHTML=`<span class="result-name">${esc(v.student)}</span><span>${esc(v.exam)}</span><strong>${v.score} / ${v.total}</strong><span class="result-status passed">${esc(v.status)}</span>`;card.appendChild(row);});});}

function studentRefresh(){const x=exams(),r=read(K.results,defaultResults).filter(v=>v.student==='Cynthia Ferrao');setDate('currentStudentDate');const live=x.filter(e=>e.status==='Live'&&!e.cancelled).length,up=x.filter(e=>e.status==='Upcoming'&&!e.cancelled).length,avg=r.length?Math.round(r.reduce((a,b)=>a+(b.score/b.total*100),0)/r.length):0;const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=String(v).padStart(2,'0')};set('availableCount',live);set('upcomingCount',up);set('completedCount',r.length);const a=document.getElementById('averageScore');if(a)a.textContent=avg+'%';const list=document.getElementById('studentExamList');if(list){list.innerHTML=x.filter(e=>!e.cancelled&&(e.status==='Live'||e.status==='Upcoming')).map(e=>`<div class="exam-card-dashboard"><div class="exam-main"><div class="exam-icon">${esc(e.name.slice(0,2).toUpperCase())}</div><div class="exam-info"><div class="exam-title-row"><h3>${esc(e.name)}</h3><span class="status ${e.status==='Live'?'available':'upcoming'}">${esc(e.status)}</span></div><p>Mid-Semester Examination</p><div class="exam-meta"><span>${e.anytime?'◷ Available Anytime':'◷ '+dateText(e.date)+(e.time?', '+timeText(e.time):'')}</span><span>◫ ${e.duration} Minutes</span><span>▣ ${e.questions} Questions</span></div></div></div><button class="${e.status==='Live'?'start-btn':'outline-btn'}" onclick="studentOpenExam('${esc(e.name)}')">${e.status==='Live'?'Start Exam':'View Details'}</button></div>`).join('');}
const rc=document.querySelector('#studentExamList')?.parentElement?.parentElement?.querySelector('.results-card');if(rc){rc.querySelectorAll('.result-row:not(.result-head)').forEach(row=>row.remove());r.slice().sort((a,b)=>String(a.date||'').localeCompare(String(b.date||''))).slice(-3).forEach(v=>{const row=document.createElement('div');row.className='result-row';row.innerHTML=`<span class="result-name">${esc(v.exam)}</span><span>${dateText(v.date)}</span><strong>${v.score} / ${v.total}</strong><span class="result-status ${v.score/v.total>=.4?'passed':'failed'}">${v.score/v.total>=.4?'Passed':'Failed'}</span>`;rc.appendChild(row);});}}
function studentOpenExam(name){localStorage.setItem('selectedExam',name);location.href='exam.html';}
function myExamsRefresh(){const x=exams(),r=read(K.results,defaultResults).filter(v=>v.student==='Cynthia Ferrao');setDate('myExamDate');const cards=document.querySelectorAll('.exam-list');if(cards.length){cards[0].innerHTML=x.filter(e=>e.status==='Upcoming'&&!e.cancelled).map(e=>`<div class="exam-card-dashboard"><div class="exam-main"><div class="exam-icon">${esc(e.name.slice(0,2).toUpperCase())}</div><div class="exam-info"><div class="exam-title-row"><h3>${esc(e.name)}</h3><span class="status upcoming">Upcoming</span></div><p>Mid-Semester Examination</p><div class="exam-meta"><span>◷ ${dateText(e.date)}${e.time?', '+timeText(e.time):''}</span><span>◫ ${e.duration} Minutes</span><span>▣ ${e.questions} Questions</span></div></div></div></div>`).join('');if(cards[1])cards[1].innerHTML=r.slice().sort((a,b)=>String(a.date||'').localeCompare(String(b.date||''))).map(v=>`<div class="result-row"><span class="result-name">${esc(v.exam)}</span><span>${dateText(v.date)}</span><strong>${v.score} / ${v.total}</strong><span class="result-status passed">Passed</span></div>`).join('');}}
function resultRefresh(){const r=read(K.results,defaultResults).filter(v=>v.student==='Cynthia Ferrao');const ordered=r.slice().sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));const latest=ordered[ordered.length-1]||defaultResults[0];const get=id=>document.getElementById(id);if(get('examName'))get('examName').textContent=latest.exam;if(get('score'))get('score').textContent=latest.score+' / '+latest.total;if(get('totalQuestions'))get('totalQuestions').textContent=latest.total;if(get('percentage'))get('percentage').textContent=Math.round(latest.score/latest.total*100)+'%';if(get('resultDate'))get('resultDate').textContent=latest.date?dateText(latest.date):today();if(get('tableScore'))get('tableScore').textContent=latest.score+' / '+latest.total;if(get('tableStatus'))get('tableStatus').textContent='Passed';if(get('historyDate'))get('historyDate').textContent=latest.date?dateText(latest.date):today();if(get('historyExam'))get('historyExam').textContent=latest.exam;if(get('infoDate'))get('infoDate').textContent=latest.date?dateText(latest.date):today();}
function profileRefresh(){const p=read(K.profile,{name:'Cynthia Ferrao',email:'cynthia@example.com',phone:'+91 98765 43210'}),n=p.name||'Cynthia Ferrao';['topName','profileName','viewName'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=n});['viewEmail','viewPhone'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=id==='viewEmail'?(p.email||'cynthia@example.com'):(p.phone||'+91 98765 43210')});}
function saveUserChanges(){const old=window._userId||document.getElementById('manageUserId')?.value;const a=read(K.users,[]),u=a.find(x=>x.id===old)||a.find(x=>x.name===document.getElementById('manageUserName')?.value);if(!u)return;const oldId=u.id;u.name=document.getElementById('manageUserName').value.trim();u.id=document.getElementById('manageUserId').value.trim();u.role=document.getElementById('manageUserRole').value;u.status=document.getElementById('manageUserStatus').value;write(K.users,a);if(u.role==='Student'){const ss=read(K.students,[]),x=ss.find(s=>s.id===oldId);if(x){x.id=u.id;x.name=u.name;x.status=u.status;write(K.students,ss)}}if(u.role==='Examiner'){const ee=read(K.examiners,[]),x=ee.find(s=>s.id===oldId);if(x){x.id=u.id;x.name=u.name;x.status=u.status;write(K.examiners,ee)}}renderUsers();renderStudents();renderExaminers();adminDash();changed();alert('User details updated successfully.');showSection('users');}
function manageUser(btn){const [,id,u]=findByRow(btn,K.users);if(!u)return;window._userId=id;document.getElementById('manageUserName').value=u.name;document.getElementById('manageUserId').value=u.id;document.getElementById('manageUserRole').value=u.role;document.getElementById('manageUserStatus').value=u.status;showSection('manageUser');}
function saveProfile(){const p=read(K.profile,{}),name=document.getElementById('nameInput')?.value.trim(),email=document.getElementById('emailInput')?.value.trim(),phone=document.getElementById('phoneInput')?.value.trim();if(name)p.name=name;if(email)p.email=email;if(phone)p.phone=phone;write(K.profile,p);profileRefresh();alert('Profile updated successfully.');}
function refresh(){init();ensureAddForms();setDate('currentAdminDate');setDate('currentExaminerDate');setDate('currentStudentDate');setDate('currentMyExamDate'); ['newExamDate','manageExamDate','postponeDate'].forEach(id=>{const el=document.getElementById(id);if(el)el.min=new Date().toISOString().slice(0,10);});if(document.getElementById('dashboardSection')&&document.querySelector('.sidebar nav .nav-item[onclick*="manageStudents"]')){adminDash();renderStudents();renderExaminers();renderAdminExams();renderUsers();}if(document.getElementById('dashboardExamList')){examinerDash();renderExaminerExams();renderExaminerTables();}if(document.getElementById('studentExamList'))studentRefresh();if(document.title.includes('My Exams'))myExamsRefresh();if(document.title.includes('Results'))resultRefresh();if(document.title.includes('Profile'))profileRefresh();}
// Preserve existing navigation functions but make them safe and data-aware.
window.addStudent=addStudent;window.saveNewStudent=saveNewStudent;window.addExaminer=addExaminer;window.saveNewExaminer=saveNewExaminer;window.showAddUserForm=showAddUserForm;window.saveNewUser=saveNewUser;window.hideAddForm=hideAddForm;window.changeManagedStatus=changeManagedStatus;window.changeExaminerStatus=changeExaminerStatus;window.saveUserChanges=saveUserChanges;window.manageUser=manageUser;window.openScheduleForm=openScheduleForm;window.saveNewExam=saveNewExam;window.scheduleExam=scheduleAdminExam;window.showScheduleForm=window.showScheduleForm||function(){showSection('exams');const f=document.getElementById('scheduleForm');if(f)f.style.display='block';};window.addExaminer=addExaminer;window.manageStudent=manageStudent;window.saveStudentChanges=saveStudentChanges;window.changeManagedStatus=changeManagedStatus;window.manageExaminer=manageExaminer;window.saveExaminerChanges=saveExaminerChanges;window.changeExaminerStatus=changeExaminerStatus;window.viewStudent=viewStudent;window.viewExaminer=viewExaminer;window.viewUser=viewUser;window.viewExam=viewExam;window.manageExam=manageExam;window.saveExamChanges=saveExamChanges;window.cancelManagedExam=cancelManagedExam;window.scheduleAdminExam=scheduleAdminExam;window.filterUsers=filterUsers;window.searchTable=searchTable;window.viewExaminerExam=viewExaminerExam;window.viewDynamicExam=function(btn){viewExam(btn)};window.viewAIExam=function(){viewExaminerExam('ai')};window.viewMathExam=function(){viewExaminerExam('math')};window.viewSoftwareExam=function(){viewExaminerExam('se')};window.openPostpone=openPostpone;window.savePostponedExam=savePostponedExam;window.cancelSelectedExam=cancelSelectedExam;window.studentOpenExam=studentOpenExam;window.handleAIExam=function(){studentOpenExam('Artificial Intelligence')};window.startSoftwareEngineering=function(){studentOpenExam('Software Engineering')};window.viewMathDetails=function(){studentOpenExam('Honours in Mathematics')};window.saveProfile=saveProfile;
window.addEventListener('storage',refresh);window.addEventListener('examPortalDataChanged',refresh);
window.addEventListener('load',()=>setTimeout(refresh,0));
init();
})();
