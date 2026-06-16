document.getElementById('year')?.textContent = new Date().getFullYear();

// Link highlighting (for multi-page, mark active based on pathname)
document.querySelectorAll('.nav a').forEach(a=>{
  if(location.pathname.endsWith(a.getAttribute('href')) || (a.getAttribute('href')==='home.html' && location.pathname.endsWith('/'))){
    a.classList.add('active');
  }
});

// Projects filters (only used on projects.html)
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    const items = document.querySelectorAll('.project');
    items.forEach(it=>{
      if(f === 'all' || it.dataset.tags.split(',').map(s=>s.trim()).includes(f)){
        it.style.display = '';
      } else {
        it.style.display = 'none';
      }
    });
  });
});

// Contact form file preview (contacts.html)
const fileInput = document.getElementById('file');
if(fileInput){
  const dropzone = document.querySelector('.dropzone');
  const filePreview = document.getElementById('file-preview');
  dropzone.addEventListener('click', ()=>fileInput.click());
  fileInput.addEventListener('change', ()=>{
    const f = fileInput.files[0];
    if(!f){ filePreview.textContent=''; return; }
    if(f.size > 5 * 1024 * 1024){ filePreview.textContent = 'File too large (max 5 MB).'; fileInput.value=''; return; }
    filePreview.textContent = `Selected: ${f.name} (${Math.round(f.size/1024)} KB)`;
  });

  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    if(!name || !email){ document.getElementById('form-result').textContent = 'Please provide name and email.'; return; }
    document.getElementById('submit-btn').disabled = true;
    document.getElementById('form-result').textContent = 'Sending...';
    setTimeout(()=>{
      document.getElementById('form-result').textContent = 'Thank you — your request has been received. We will contact you within 2 business days.';
      form.reset(); filePreview.textContent=''; document.getElementById('submit-btn').disabled = false;
    }, 900);
  });
}
