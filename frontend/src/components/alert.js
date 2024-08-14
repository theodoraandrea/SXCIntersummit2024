import React from 'react';
import swal from 'sweetalert';

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
};

export default DynamicAlertComponent;

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

