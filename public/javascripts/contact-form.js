// (()=>{
//     window.addEventListener("load", () => {
//         const nameEl = document.getElementById("contact-name");
//         const emailEl = document.getElementById("contact-email");
//         const messageEl = document.getElementById("contact-message");

//         // function resetCustomValidity(e){
//             // if(e.target.checkValidity()){
//             //     e.target.setCustomValidity('');
//             //     e.target.reportValidity();
//             // }
//         // }

//         // nameEl.addEventListener("input", resetCustomValidity);
//         // emailEl.addEventListener("input", resetCustomValidity);
//         // messageEl.addEventListener("input", resetCustomValidity);

//         document.getElementById("contact-form-submit").addEventListener("click", function(e){
//             // e.preventDefault();

//             const namePattern = /[A-Za-z][A-Za-z'\- ]+/;
//             const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
//             const messagePattern = /^[\w\s\p{P}]*$/;
            
            
            

//             // let isNameValid = true, isEmailValid = true, isMessageValid = true;

//             // nameEl.setCustomValidity('');
//             // emailEl.setCustomValidity('');
//             // messageEl.setCustomValidity('');

//             nameEl.reportValidity();
//             emailEl.reportValidity();
//             messageEl.reportValidity();

//             if(nameEl.checkValidity() && emailEl.checkValidity() && messageEl.checkValidity()){
//                 // submit
//                 console.log("valid")
//             }
//             else console.log("invalid")

//         });
        
//     });
// })();