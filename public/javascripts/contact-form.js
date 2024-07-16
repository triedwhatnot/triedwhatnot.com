(()=>{
    window.addEventListener("load", () => {
        const nameEl = document.getElementById("contact-name");
        const emailEl = document.getElementById("contact-email");
        const textareaEl = document.getElementById("contact-message");
        const submitBtn = document.getElementById("contact-form-submit");

        const statusTextEl = document.getElementById("res-text");

        const namePattern = /^[A-Za-z][A-Za-z'\- ]+$/;
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const textareaPattern = /^[\w\s\p{P}!]*$/;

        const nameErrMsg = "Name should only contain letters, spaces, apostrophes, and hyphens." 
        const emailErrMsg = "Please enter a valid email address."
        const textareaErrMsg = "Please enter only alphanumeric, spaces, line breaks, tabs and generic punctuation characters."

        function resetCustomValidity(e){
            e.target.setCustomValidity('');
            // e.target.reportValidity();
            // nameEl.checkValidity();
        }

        function disablePasteInInputs(e){
            e.preventDefault();
            return;
        }

        nameEl.addEventListener("paste", disablePasteInInputs);
        emailEl.addEventListener("paste", disablePasteInInputs);
        textareaEl.addEventListener("paste", disablePasteInInputs); 

        nameEl.addEventListener("input", resetCustomValidity);
        emailEl.addEventListener("input", resetCustomValidity);
        textareaEl.addEventListener("input", resetCustomValidity);    

        submitBtn.addEventListener("click", function(){
            const nameVal = nameEl.value;
            const emailVal = emailEl.value;
            const textareaVal = textareaEl.value;

            if(!namePattern.test(nameVal)){
                nameEl.setCustomValidity(nameErrMsg);
                nameEl.reportValidity();
                return;
            }
            else{
                nameEl.setCustomValidity("");
            }

            if(!emailPattern.test(emailVal)){
                emailEl.setCustomValidity(emailErrMsg);
                emailEl.reportValidity();
                return;
            }
            else{
                emailEl.setCustomValidity("");
            }

            if(!textareaPattern.test(textareaVal)){
                textareaEl.setCustomValidity(textareaErrMsg);
                textareaEl.reportValidity();
                return;
            }
            else{
                textareaEl.setCustomValidity("");
            }

            // send post request
            saveContact(nameVal, emailVal, textareaVal);
        });


        async function saveContact(nameVal, emailVal, textareaVal){
            try {
                const response = await fetch(window.location.origin + '/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        name: nameVal, 
                        email: emailVal, 
                        message: textareaVal 
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if(data?.statusCode === 1){
                    handleContactSubmissionSuccess();
                }
                else if(data?.statusCode === 2){
                    handleContactSubmissionFailure("Invalid input received. Please try again!");
                }
                else if(data?.statusCode === 3){
                    handleContactSubmissionFailure("Empty input received. Please try again!");
                }
                else{
                    throw new Error('Network response was not ok');
                    handleContactSubmissionFailure();
                }

            } 
            catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                handleContactSubmissionFailure();
            }
        }

        function handleContactSubmissionSuccess(){
            // empty the fields and display sent message
            nameEl.value = "";
            emailEl.value = "";
            textareaEl.value = "";

            statusTextEl.classList.add("success");
            statusTextEl.innerText = "Message Sent successfully!";

            setTimeout(()=>{
                statusTextEl.classList.remove("success");
                statusTextEl.innerText = "";
            }, 4000);
        }
        
        function handleContactSubmissionFailure(msg = "Message couldn't be sent. Please try again!"){
            statusTextEl.classList.add("failure");
            statusTextEl.innerText = msg;

            setTimeout(()=>{
                statusTextEl.classList.remove("failure");
                statusTextEl.innerText = "";
            }, 4000);
        }
    });
})();