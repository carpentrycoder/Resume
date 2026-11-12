'use strict';
(() => {
  const data = {
    about: "I'm Nikhil, a backend developer in Mumbai. I build backend systems, APIs and data workflows with Python, Django, FastAPI, REST and SQL, and add machine learning or LLM features where they improve the product. I currently intern at Publicis Groupe on Nestlé and Adobe projects.",
    skills: [
      ['Languages','Python, Java, JavaScript, SQL, C'],['Backend','Django, Django REST, Flask, FastAPI, Node.js, Webhooks, Shopify, Prometheus, Grafana'],['Frontend','React, Next.js, Tailwind, Bootstrap, Mantine UI'],['Databases','PostgreSQL, MySQL, MongoDB, SQLite, Microsoft SQL Server'],['AI & data','Machine learning, deep learning, LLMs, Hugging Face, NumPy, Pandas, scikit-learn, Power BI, MCP (model context protocol)'],['Tools','Git, GitHub, Docker, VS Code, PyCharm, IntelliJ, Jupyter, Google Colab']
    ],
    projects: [
      ['Rural telehealth platform','1st place, International UAi HAWK-ATHON 2026. FastAPI, PostgreSQL, Groq API and OpenRouter for low-bandwidth healthcare.'],
      ['SWASTH-AI','AI healthcare and diet system using Python, TensorFlow/LSTM, scikit-learn and LLMs.'],
      ['SaleGyaan','Sales CSV validation, trend analysis and ML forecasting with LLM-assisted insights.'],
      ['Success Classes of Engineering','Responsive Flask website built for a freelance client.'],
      ['Pranav Interiors','Django business website deployed on Render.']
    ],
    experience: [
      ['Backend Developer Intern, Publicis Groupe','May 2026 to present · Mumbai, on site','Backend and marketing technology for Nestlé and Adobe using Python, Django, REST and SQL.'],
      ['Backend Developer Intern, Altissadvance Tech (XIRCLS)','Jun to Sep 2025 · on site','Built and optimized scalable Python, Django and MySQL services.'],
      ['Python Developer, Freelance','2025 · hybrid','Built a production website for Success Classes of Engineering.']
    ],
    education: ['B.E. in Artificial Intelligence and Data Science','Konkan Gyanpeeth College of Engineering, University of Mumbai · 2023 to 2026 · CGPI 7.28'],
    contact: {email:'nikhilsutar621@gmail.com', links:[['LinkedIn','https://www.linkedin.com/in/nikhil-sutar-b5471b2b7/'],['GitHub','https://github.com/carpentrycoder/'],['HackerRank','https://www.hackerrank.com/profile/nikhilsutar621'],['X','https://x.com/CodingD47206']]},
    resume:'https://drive.google.com/file/d/1eUwFi7moJ_Qnt9lywDxv1v4DhQmSMSRX/view?usp=sharing'
  };
  const output=document.querySelector('#output'), form=document.querySelector('#terminal-form'), input=document.querySelector('#command-input'), screen=document.querySelector('#screen'), prompt=document.querySelector('#prompt'), title=document.querySelector('#terminal-title'), toggle=document.querySelector('#os-toggle');
  const history=[]; let historyIndex=0; let os='mac';
  const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
  const block=(cls='')=>{const e=make('div',`output-entry ${cls}`);output.append(e);return e};
  const line=(parent,text,cls='')=>parent.append(make('div',cls,text));
  const link=(parent,label,url)=>{const a=make('a','',label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';parent.append(a)};
  const scroll=()=>requestAnimationFrame(()=>{screen.scrollTop=screen.scrollHeight});
  const currentPrompt=()=>os==='mac'?'nikhil@portfolio:~$':'C:\\Users\\Nikhil>';
  function setOS(next,announce=true){os=next;document.documentElement.dataset.os=os;prompt.textContent=currentPrompt();title.textContent=os==='mac'?'nikhil@portfolio — zsh':'Command Prompt — nikhil-portfolio';toggle.textContent=os==='mac'?'Switch to Windows':'Switch to macOS';toggle.setAttribute('aria-label',toggle.textContent+' terminal style');try{localStorage.setItem('terminal-os',os)}catch(_){}if(announce){const b=block();line(b,`Interface switched to ${os==='mac'?'macOS':'Windows'} mode.`)}}
  const commands={
    help(){const b=block();line(b,'AVAILABLE COMMANDS','heading');[['help','Show this command list'],['about','Professional introduction'],['skills','Technical skills'],['projects','Featured projects'],['experience','Professional experience'],['education','Educational background'],['contact','Email and social links'],['resume','Open résumé'],['os mac / os win','Change window style'],['clear / cls','Clear terminal history'],['exit','Return to main portfolio']].forEach(([c,d])=>line(b,`${c.padEnd(18)} ${d}`));},
    about(){const b=block();line(b,'ABOUT','heading');line(b,data.about);},
    skills(){const b=block();line(b,'TECHNICAL SKILLS','heading');data.skills.forEach(([k,v])=>line(b,`${k.padEnd(13)} ${v}`));},
    projects(){const b=block();line(b,'FEATURED PROJECTS','heading');data.projects.forEach(([n,d],i)=>{line(b,`${i+1}. ${n}`,'heading');line(b,`   ${d}`)});},
    experience(){const b=block();line(b,'EXPERIENCE','heading');data.experience.forEach(([r,w,d])=>{line(b,r,'heading');line(b,w,'dim');line(b,d);line(b,'')});},
    education(){const b=block();line(b,'EDUCATION','heading');line(b,data.education[0]);line(b,data.education[1],'dim');},
    contact(){const b=block();line(b,'CONTACT','heading');link(b,data.contact.email,`mailto:${data.contact.email}`);line(b,'');data.contact.links.forEach(([n,u])=>{link(b,n,u);b.append(document.createTextNode('  '))});},
    resume(){const b=block();line(b,'RÉSUMÉ','heading');link(b,'Open / download Nikhil Sutar’s résumé',data.resume);window.open(data.resume,'_blank','noopener,noreferrer');},
    clear(){output.replaceChildren();}, cls(){commands.clear();}, exit(){window.location.assign('index.html');}
  };
  function run(raw){const value=raw.trim();if(!value)return;const shown=block('command');line(shown,`${currentPrompt()} ${value}`);history.push(value);historyIndex=history.length;const normalized=value.toLowerCase().replace(/\s+/g,' ');if(normalized==='os mac')setOS('mac');else if(normalized==='os win'||normalized==='os windows')setOS('win');else if(commands[normalized])commands[normalized]();else{const b=block('error');line(b,`Command not found: ${value}`);line(b,"Type 'help' to list available commands.",'dim')}scroll();}
  form.addEventListener('submit',e=>{e.preventDefault();run(input.value);input.value=''});
  input.addEventListener('keydown',e=>{if(e.key==='ArrowUp'&&history.length){e.preventDefault();historyIndex=Math.max(0,historyIndex-1);input.value=history[historyIndex]||'';input.setSelectionRange(input.value.length,input.value.length)}else if(e.key==='ArrowDown'){e.preventDefault();historyIndex=Math.min(history.length,historyIndex+1);input.value=history[historyIndex]||''}});
  toggle.addEventListener('click',()=>{setOS(os==='mac'?'win':'mac');scroll();input.focus()});
  screen.addEventListener('click',e=>{if(!e.target.closest('a,button'))input.focus()});
  try{const saved=localStorage.getItem('terminal-os');if(saved==='win'||saved==='mac')os=saved}catch(_){}
  setOS(os,false);const welcome=block();line(welcome,'NIKHIL SUTAR // INTERACTIVE PORTFOLIO','heading');line(welcome,'Backend Developer · Python · AI · Mumbai, India');line(welcome,"System ready. Type 'help' to explore.",'dim');input.focus();
})();
