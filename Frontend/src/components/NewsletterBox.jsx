import React from "react";

const NewsletterBox = () => {
  const formHandeler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad delectus
        molestiae temporibus.
      </p>
      <form
        onSubmit={(event) => {
          formHandeler(event);
        }}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-3 border border-gray-300"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none px-3 py-3 text-sm caret-black"
          required
        />
        <button
          className="bg-black text-white text-xs px-10 py-4 active:bg-gray-800"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
