import React, { useState } from "react";
import tenderData from "../data/tender.json";
import subOptionContent from "../data/subOptionContent.json";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";

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

  return (
    <div className="p-4">
      <h2 className="text-center font-black text-3xl">{content.title}</h2>
      <p className="text-center">{content.content}</p>
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
              <tr key={tender.tender_id} className="bg-red-500 border-b border-red-400">
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
          Page {currentPage} of {Math.ceil(filteredData.length / postsPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredData.length / postsPerPage)}
          className="text-red-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BodyContent;
