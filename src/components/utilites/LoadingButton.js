import React from 'react';

const LoadingButton = ({ isLoading, isSuccess, onClick }) => {
    const svgPath1 = "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z";
    const svgPath2 = "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z";


    if (isSuccess) {
        return (
            <button type="button" className="rounded-2xl bg-green-500 h-12 w-96 border-4 border-green-700 text-white">
                <svg viewBox="0 0 24 24" fill="none" className="w-13 h-14 pl-2 pb-7">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 22c5.522 0 10-4.478 10-10S17.522 2 12 2 2 6.478 2 12s4.478 10 10 10zm-1.293-7.707a1 1 0 00.083 1.32l.094.083 4-4a1 1 0 00-1.32-1.497l-.094.083L11 13.585l-1.293-1.292a1 1 0 00-1.497 1.32l.083.094L11 14.585l-1.293 1.292z" fill="currentColor" />
                </svg>
                <p className="text-black -mt-14 text-xl">Success!</p>
            </button>
        );
    }

    return (
        <button
            type="submit"
            className={`rounded-2xl bg-background h-12 w-96 border-4 border-blue-here hover:border-background 
        hover:bg-opacity-40 hover:text-black ${isLoading ? 'relative' : ''}`}
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading && (
                <svg aria-hidden="true" role="status" className={`absolute left-0 right-0 mx-auto w-7 h-8 -mt-1 animate-spin `} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={svgPath1} fill="black" />
                    <path d={svgPath2} fill="white" />
                </svg>

            )}
            <span className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}>SUBMIT</span>
        </button>
    );
};


export default LoadingButton;
