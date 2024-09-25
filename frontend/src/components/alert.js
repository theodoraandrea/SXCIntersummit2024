import Swal from 'sweetalert2';

const errorAlert = ({ title, message }) => {
    let titleText;
    if (!title) {
        titleText = "Error!";
    } else {
        titleText = title;
    }
    Swal.fire({
        titleText: titleText,
        text: message,
        icon: 'error',
        toast: true,
        width:'30rem',
        timer: 2000,
        position: 'top',
        padding: '1rem 2rem',
        showConfirmButton: false
      });
}

const successAlert = ({ compId, eventId, title, message }) => {
    let titleText;
    if (!title) {
        titleText = "Success!";
    } else {
        titleText = title;
    }

    let additionalHtml = '';
    if (eventId === "event_1") {
        additionalHtml = `
        <br>
        <a href="https://chat.whatsapp.com/Hwg157Dbv3UFMX50rEg6aZ" target="_blank" style="display: inline-block; margin-top: 10px; padding: 5px 10px; background-color: #25D366; color: white; border-radius: 5px; text-decoration: none;">Join WhatsApp Group</a>`;
    } else if (compId === "comp_2") {
        additionalHtml = `
        <br>
        <a href="https://chat.whatsapp.com/Gut5M6ilA9QCydC4vTPuD7" target="_blank" style="display: inline-block; margin-top: 10px; padding: 5px 10px; background-color: #25D366; color: white; border-radius: 5px; text-decoration: none;">Join WhatsApp Group</a>`;
    } else if (compId === "comp_3") {
        additionalHtml = `
        <br>
        <a href="https://chat.whatsapp.com/IL6ixCcOWVg8rTJbeGF47t" target="_blank" style="display: inline-block; margin-top: 10px; padding: 5px 10px; background-color: #25D366; color: white; border-radius: 5px; text-decoration: none;">Join WhatsApp Group</a>`;
    }

    console.log("Additional HTML:", additionalHtml);

    Swal.fire({
        titleText: titleText,
        html: `${message}${additionalHtml}`,
        // text: message,
        icon: 'success',
        toast: true,
        position: 'top',
        width:'30em',
        padding: '1rem 2rem',
        showConfirmButton: false,
        showCloseButton:true,
      });
}

export {
    errorAlert,
    successAlert
}

/*
const DynamicAlertComponent = ({ isSuccess, message }) => {
    const handleAlert = () => {
        if (isSuccess) {
            swal("Success!", message || "Your data has been submitted!", "success");
        } else {
            swal("Oh noes!", message || "Data submission failed!", "error");
        }
    };

    React.useEffect(() => {
        handleAlert();
    }, [isSuccess, message]);

    return null;
};*/


// Implementation : 

// export default DynamicAlertComponent;

// import React from 'react';
// import DynamicAlertComponent from './DynamicAlertComponent';

// const SomeComponent = () => {
//     const [isSuccess, setIsSuccess] = React.useState(false);
//     const [message, setMessage] = React.useState('');

//     // Simulate a submission process
//     const submitData = async () => {
//         try {
//             // Assume submission logic here
//             setIsSuccess(true);
//             setMessage("Your data was submitted successfully!");
//         } catch (error) {
//             setIsSuccess(false);
//             setMessage("There was an error submitting your data.");
//         }
//     };

//     return (
//         <div>
//             <button onClick={submitData}>Submit Data</button>
//             <DynamicAlertComponent isSuccess={isSuccess} message={message} />
//         </div>
//     );
// };

// export default SomeComponent;

