function showProject(){
  project.classList.remove("hidden");
  cert.classList.add("hidden");

  btnProject.classList.add("text-cyan-400","border-cyan-400");
  btnCert.classList.remove("text-cyan-400","border-cyan-400");
}

function showCert(){
  project.classList.add("hidden");
  cert.classList.remove("hidden");

  btnCert.classList.add("text-cyan-400","border-cyan-400");
  btnProject.classList.remove("text-cyan-400","border-cyan-400");
}

function showProject(){
  document.getElementById("projectContent").classList.remove("hidden");
  document.getElementById("certContent").classList.add("hidden");
}

function showCert(){
  document.getElementById("projectContent").classList.add("hidden");
  document.getElementById("certContent").classList.remove("hidden");
}