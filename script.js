const IMG_OK='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#1e7e34" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>');
const IMG_BAD='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#c92a2a" d="M12 10.586L16.95 5.636 18.364 7.05 13.414 12l4.95 4.95-1.414 1.414L12 13.414l-4.95 4.95-1.414-1.414L10.586 12 5.636 7.05 7.05 5.636 12 10.586z"/></svg>');
const submitBtn=document.getElementById('submitBtn');
const q7Range=document.getElementById('q7');
const q7Val=document.getElementById('q7Val');
q7Range.addEventListener('input',()=>q7Val.textContent=q7Range.value+'%');
document.addEventListener('DOMContentLoaded',()=>{displayQ4Choices();document.getElementById('totalAttempts').textContent=localStorage.getItem('quiz_total_attempts')||0;});
submitBtn.addEventListener('click',gradeQuiz);
function displayQ4Choices(){const container=document.getElementById('q4Choices');const choices=['Rhode Island','Maine','Delaware','Maryland'];shuffleArray(choices);for(let i=0;i<choices.length;i++){const id='q4_'+i;container.innerHTML+=`<div class="form-check"><input class="form-check-input" type="radio" name="q4" id="${id}" value="${choices[i]}"><label class="form-check-label" for="${id}">${choices[i]}</label></div>`;}}
function shuffleArray(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}}
function clearFeedbacks(){for(let i=1;i<=10;i++){const fb=document.getElementById(`q${i}Feedback`);if(fb){fb.className='mt-2 feedback';fb.innerHTML='';}const mk=document.getElementById(`markImg${i}`);if(mk)mk.innerHTML='';}document.getElementById('totalScore').textContent='';document.getElementById('congrats').textContent='';}
function markRight(index,msg){const fb=document.getElementById(`q${index}Feedback`);const mk=document.getElementById(`markImg${index}`);if(mk)mk.innerHTML=`<img src="${IMG_OK}" alt="correct">`;fb.className='mt-2 feedback bg-success';fb.innerHTML=msg||'Correct';}
function markWrong(index,msg){const fb=document.getElementById(`q${index}Feedback`);const mk=document.getElementById(`markImg${index}`);if(mk)mk.innerHTML=`<img src="${IMG_BAD}" alt="incorrect">`;fb.className='mt-2 feedback bg-danger';fb.innerHTML=msg||'Incorrect';}
function gradeQuiz(){clearFeedbacks();let score=0;const q1=document.getElementById('q1').value.trim();if(!q1){markWrong(1,'Please answer question 1');return;}const q2=document.getElementById('q2').value;if(!q2){markWrong(2,'Please select an option');return;}const q3checks=['q3Washington','q3Jefferson','q3Lincoln','q3Roosevelt'].map(id=>document.getElementById(id).checked);if(!q3checks.some(Boolean)){markWrong(3,'Please select at least one');return;}const q4selected=document.querySelector('input[name=q4]:checked');if(!q4selected){markWrong(4,'Please choose one');return;}const q5selected=document.querySelector('input[name=q5]:checked');if(!q5selected){markWrong(5,'Please choose one');return;}const q6val=document.getElementById('q6').value;if(q6val===''){markWrong(6,'Please provide a number');return;}const q8val=document.getElementById('q8').value;if(!q8val){markWrong(8,'Please select a date');return;}const q9sel=Array.from(document.getElementById('q9').selectedOptions).map(o=>o.value);if(q9sel.length===0){markWrong(9,'Please select at least one');return;}const q10=document.getElementById('q10').value.trim();if(!q10){markWrong(10,'Please answer question 10');return;}
if(q1.toLowerCase()==='sacramento'){markRight(1);score+=10}else{markWrong(1,'Correct: Sacramento');}
if(q2==='Alaska'){markRight(2);score+=10}else{markWrong(2,'Correct: Alaska');}
const q3Correct=q3checks.every(v=>v===true);
if(q3Correct){markRight(3);score+=10}else{markWrong(3,'Correct: Washington, Jefferson, Lincoln, Roosevelt (all four)');}
if(q4selected.value==='Rhode Island'){markRight(4);score+=10}else{markWrong(4,'Correct: Rhode Island');}
if(q5selected.value==='7'){markRight(5);score+=10}else{markWrong(5,'Correct: 7');}
if(Number(q6val)===90){markRight(6);score+=10}else{markWrong(6,'Correct: 90');}
const q7val=Number(document.getElementById('q7').value);
if(q7val>=69&&q7val<=73){markRight(7);score+=10}else{markWrong(7,'Acceptable approx: ~71%');}
const dt=new Date(q8val);
if(dt.getFullYear()===1776){markRight(8);score+=10}else{markWrong(8,'Correct year: 1776');}
const q9correctSet=['2','3','5'];
const q9selSorted=q9sel.slice().sort();
const q9correctSorted=q9correctSet.slice().sort();
if(q9selSorted.length===q9correctSorted.length&&q9selSorted.every((v,i)=>v===q9correctSorted[i])){markRight(9);score+=10}else{markWrong(9,'Correct: 2, 3, and 5 (only these)');}
if(q10.toLowerCase().includes('pacific')){markRight(10);score+=10}else{markWrong(10,'Correct: Pacific');}
const totalScoreEl=document.getElementById('totalScore');
totalScoreEl.textContent=`Total Score: ${score} / 100`;
if(score>=80){totalScoreEl.style.color='#0f5132';document.getElementById('congrats').textContent='Congratulations — great job!'}else{totalScoreEl.style.color='#842029';document.getElementById('congrats').textContent=''}
const attemptsKey='quiz_total_attempts';
let attempts=Number(localStorage.getItem(attemptsKey)||0);
attempts+=1;
localStorage.setItem(attemptsKey,attempts);
document.getElementById('totalAttempts').textContent=attempts;
}
