const regName = document.querySelector("#regName");
const regTel = document.querySelector("#regTel");
const regMail = document.querySelector("#regMail");
const regPass = document.querySelector("#regPass");
const signUpBtn = document.querySelector("#signUp");
const showMess = document.createElement('p');
const regForm = document.getElementById('regForm');
const logForm = document.getElementById('logForm');
const body = document.querySelector('body');

let users;

if(localStorage.getItem("users")){
   users = JSON.parse(localStorage.getItem("users"));
}else{
   users = [];
}

signUpBtn.addEventListener('click', (elemet) =>{
    elemet.stopPropagation();
    elemet.preventDefault();

if(regMail.value === "" ||
    regName.value === "" ||
    regPass.value === "" ||
    regTel.value === ""){
        showMess.innerText = "All fields are obligatory";
        showMess.style.color = "red";
        regForm.append(showMess);
        return;
}

    let isError = false;

    for(let i = 0; i < users.length; i++){
        if(users[i].mail === regMail.value){
            showMess.innerText = "A user with this email already exists!";
            showMess.style.color = "red";
            regForm.append(showMess);
            isError = true;
            break;
        }
    }
    if (isError) return;

    const userData = {
        name: regName.value,
        telephone: regTel.value,
        mail: regMail.value,
        password: regPass.value,
        };
       users.push(userData)
       localStorage.setItem("users", JSON.stringify(users));

        regName.value = "";
        regTel.value = "";
        regMail.value = "";
        regPass.value = "";

        showMess.innerText = "You have successfully registered";
        showMess.style.color = "green";
        regForm.append(showMess)
        return;
});

const logMail = document.querySelector("#logMail");
const logPass = document.querySelector("#logPass");
const signInBtn = document.querySelector("#signIn");

signInBtn.addEventListener('click', (el)=>{
    el.stopPropagation();
    el.preventDefault();

    let isLoginError = true;

    if (users.length === 0) {
        showMess.innerText = "No users in data";
        showMess.style.color = "red";
        logForm.append(showMess);
        return;
    }

    for(let i = 0; i < users.length; i++){
        if(users[i].mail === logMail.value && users[i].password === logPass.value){
            isLoginError = false;
        }else{
        showMess.innerText = "You entered an incorrect email or password";
        showMess.style.color = "red";
        logForm.append(showMess);
        break;
    };
    };   
    if (isLoginError) return;

    logMail.value = "";
    logPass.value = "";

    showMess.innerText = "You have successfully logged in";
    showMess.style.color = "green";
    logForm.append(showMess);

    body.innerHTML = "";
 const btnLogout = document.createElement("button");
 btnLogout.innerText = "Logout";
 btnLogout.classList.add("logout-btn")
 body.append(btnLogout);

 btnLogout.addEventListener("click", () => {
    body.innerHTML = "";
    localStorage.clear();
    body.append(regForm);
    body.append(logForm);
    regForm.reset();
    logForm.reset();
    showMess.innerText="";
});
 });
 document.body.appendChild(showMess);
