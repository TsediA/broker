import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaperworkManagement = () => {
  const navigate = useNavigate();

  const [paperwork, setPaperwork] = useState([]);
  const [newPaperwork, setNewPaperwork] = useState({
    property: '',
    document: '',
    status: 'pending',
    submittedBy: '',
    approvedBy: '',
    approvedDate: '',
  });

  useEffect(() => {
    // Fetch the required paperwork from the server and update the state
    fetchPaperwork();
  }, []);

  const fetchPaperwork = () => {
    // Implement the logic to fetch the paperwork from the server
    // and update the `paperwork` state
    // For now, we'll use some sample data
    const samplePaperwork = [
      {
        id: 1,
        property: '123 Main St',
        document: 'Purchase Agreement',
        status: 'approved',
        submittedBy: 'John Doe',
        approvedBy: 'Jane Smith',
        approvedDate: '2023-09-10',
      },
      {
        id: 2,
        property: '456 Oak Rd',
        document: 'Deed',
        status: 'pending',
        submittedBy: 'Sarah Lee',
        approvedBy: '',
        approvedDate: '',
      },
      {
        id: 3,
        property: '789 Elm St',
        document: 'Title Insurance',
        status: 'approved',
        submittedBy: 'David Kim',
        approvedBy: 'Lisa Park',
        approvedDate: '2023-09-15',
      },
    ];
    setPaperwork(samplePaperwork);
  };

  const handleInputChange = (event) => {
    setNewPaperwork({
      ...newPaperwork,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitPaperwork = () => {
    // Implement the logic to create a new paperwork entry on the server
    // and update the `paperwork` state
    console.log('Submitting new paperwork:', newPaperwork);
    setNewPaperwork({
      property: '',
      document: '',
      status: 'pending',
      submittedBy: '',
      approvedBy: '',
      approvedDate: '',
    });
  };

  const handleApprovePaperwork = (paperworkId) => {
    // Implement the logic to approve a paperwork entry on the server
    // and update the `paperwork` state
    console.log(`Approving paperwork ${paperworkId}`);
  };
  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div>
       <div className="back-btn" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i>
      </div>
      <h1>Paperwork Management</h1>
      <h2>Required Paperwork</h2>
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Document</th>
            <th>Status</th>
            <th>Submitted By</th>
            <th>Approved By</th>
            <th>Approved Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paperwork.map((document) => (
            <tr key={document.id}>
              <td>{document.property}</td>
              <td>{document.document}</td>
              <td>{document.status}</td>
              <td>{document.submittedBy}</td>
              <td>{document.approvedBy}</td>
              <td>{document.approvedDate}</td>
              <td>
                {document.status === 'pending' && (
                  <button onClick={() => handleApprovePaperwork(document.id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Submit New Paperwork</h2>
      <form>
        <label>
          Property:
          <input
            type="text"
            name="property"
            value={newPaperwork.property}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Document:
          <input
            type="text"
            name="document"
            value={newPaperwork.document}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Submitted By:
          <input
            type="text"
            name="submittedBy"
            value={newPaperwork.submittedBy}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleSubmitPaperwork}>
          Submit Paperwork
        </button>
      </form>
    </div>
  );
};

export default PaperworkManagement;