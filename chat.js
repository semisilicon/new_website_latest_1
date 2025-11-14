document.addEventListener('DOMContentLoaded', function(){
  const send = document.getElementById('sendChat');
  const input = document.getElementById('chatInput');
  const body = document.getElementById('chatBody');
  function addMessage(text, who='ai'){
    const p=document.createElement('div');p.style.marginBottom='8px';p.style.padding='8px';p.style.borderRadius='6px';p.style.maxWidth='90%';
    if(who==='user'){p.style.marginLeft='auto';p.style.background='#e6f0ff';}else{p.style.background='#f4f8ff';}
    p.textContent=text;body.appendChild(p);body.scrollTop=body.scrollHeight;
  }
  send.addEventListener('click',async()=>{
    const msg=input.value.trim();if(!msg)return;addMessage(msg,'user');input.value='';addMessage('Thinking...','ai');
    try{
      const resp=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg})});
      const data=await resp.json();
      const nodes = body.querySelectorAll('div');
      if(nodes.length) nodes[nodes.length-1].remove();
      addMessage(data.reply||'No reply from server','ai');
    }catch(e){const nodes = body.querySelectorAll('div'); if(nodes.length) nodes[nodes.length-1].remove(); addMessage('Error contacting server.','ai');console.error(e);}
  });
});