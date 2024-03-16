import React from 'react';

const CustomErrorPage = ({ message }) => {
  return (
    <div className="min-h-screen bg-background flex justify-center items-center">
      <div className="mt-60 p-8 text-xl shadow-2xl rounded-3xl mx-96 bg-pink-here">
        <h1 className="text-red-600 text-3xl font-bold text-center mb-5">Error!!</h1>
        <p className="text-center">{message}</p>
      </div>
    </div>
  );
};

export default CustomErrorPage;
