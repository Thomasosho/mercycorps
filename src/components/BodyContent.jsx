import React, { useState } from "react";
import tenderData from "../data/tender.json";
import subOptionContent from "../data/subOptionContent.json";
// eslint-disable-next-line
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { useAuth } from "../contexts/AuthContext";

const BodyContent = ({ selectedSubOption }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const content = subOptionContent[selectedSubOption];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const filteredData = tenderData.filter((tender) =>
    tender.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const downloadPdf = (tender) => {
    const doc = new jsPDF();
    doc.text(`Tender ID: ${tender.tender_id}`, 10, 10);
    doc.text(`Title: ${tender.title}`, 10, 20);
    doc.text(`Description: ${tender.description}`, 10, 30);
    doc.text(`Location: ${tender.location}`, 10, 40);
    doc.text(`Deadline: ${tender.deadline}`, 10, 50);
    doc.text(`Budget: ${tender.budget}`, 10, 60);
    doc.save(`${tender.tender_id}.pdf`);
  };

  const { isLoggedIn } = useAuth();

  return (
    <div className="p-4">
      <h2 className="text-center font-black text-3xl">{content.title}</h2>
      <p className="text-center">{content.content}</p>
      {isLoggedIn ? (
        <>
          <div className="mb-4 text-center mt-4">
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-2 w-[50%]"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
              <thead className="text-xs text-white uppercase bg-red-600 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tender ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Deadline
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Budget
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((tender) => (
                  <tr
                    key={tender.tender_id}
                    className="bg-red-500 border-b border-red-400"
                  >
                    <td className="px-6 py-4">{tender.tender_id}</td>
                    <td className="px-6 py-4">{tender.title}</td>
                    <td className="px-6 py-4">{tender.description}</td>
                    <td className="px-6 py-4">{tender.location}</td>
                    <td className="px-6 py-4">{tender.deadline}</td>
                    <td className="px-6 py-4">{tender.budget}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => downloadPdf(tender)}
                        className="text-white bg-red-700 hover:bg-red-900 px-2 py-1 rounded"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-red-400"
            >
              Previous
            </button>
            <span className="mx-2">
              Page {currentPage} of{" "}
              {Math.ceil(filteredData.length / postsPerPage)}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredData.length / postsPerPage)
              }
              className="text-red-600"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="h-screen place-content-center text-center align-center-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="100px"
            viewBox="0 -960 960 960"
            width="100px"
            fill="#E64646"
          >
            <path d="M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z" />
          </svg>
            <p>You have to have an account to view Tenders</p>
        </div>
      )}
    </div>
  );
};

export default BodyContent;
