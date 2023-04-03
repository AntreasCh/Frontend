import React, { useState, useEffect } from 'react';
import Emaildata from './emaildata';
import ParentPage from './ParentPage';

function Submissions(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(10);
  const [sortOption, setSortOption] = useState('a-z');
  const [currentPage, setCurrentPage] = useState(1);
  const [interestOption, setInterestOption] = useState('Select Interest');

  const searchSubmissions = (value) => {
    const sr = value.name + ' ' + value.message + ' ' + value.organisation + ' ' + value.email + ' ' + value.phone_number + ' ' + value.interests;
    return sr.toLowerCase().includes(searchTerm.toLowerCase()) || value.message.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const interestsOptions = [
    'Select Interest',
    'Arts, Culture and Heritage',
    'Construction',
    'Digital',
    'Energy and Environment',
    'Engineering and Manufacturing',
    'Professional Services',
    'Public Sector and Local Authority',
    'Science, Health and Social Care',
    'Sport and Exercise',
    'Other'
  ];

  const onChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filterSubmissions = (value) => {
    if (interestOption === 'Select Interest') {
      return true;
    }
    return value.interests === interestOption;
  };
  
  const sortSubmissions = (a, b) => {
    switch (sortOption) {
      case 'a-z':
        return a.name.localeCompare(b.name);
      case 'z-a':
        return b.name.localeCompare(a.name);
      case 'newest':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at);
      default:
        return 0;
    }
  };

  const filteredSubmissions = props.submissions.filter(searchSubmissions).filter(filterSubmissions).sort(sortSubmissions);

  const totalPages = Math.ceil(filteredSubmissions.length / limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visibleSubmissions = filteredSubmissions.slice((currentPage - 1) * limit, currentPage * limit);

  const allSubmissions = visibleSubmissions.map((value, key) => (
    <section key={key}>
      <Emaildata data={value} />
    </section>
  ));

  return (
    <ParentPage>
      <div className="Data">
        <h1 className='tlt'>Email Submissions:</h1>
        
      
      
      <div><strong>Search:</strong></div>
        <input className='search'  value={searchTerm} onChange={onChange} placeholder="Search"/>
       <br/>
       <button  onClick={() => {window.location.href = '/contactus';}}> <strong>Go Back</strong></button>
       <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
  <div><strong>Sort by:</strong></div>
 
  <select className='sl' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
    <option value="newest">Newest to Oldest</option>
    <option value="oldest">Oldest to Newest</option>
    <option value="a-z">A-Z</option>
    <option value="z-a">Z-A</option>
  </select>
  <div><strong>Interests:</strong></div>
  <select className='sl' value={interestOption} onChange={(e) => setInterestOption(e.target.value)}>
    {interestsOptions.map((option) => (
      <option value={option} key={option}>{option}</option>
    ))}
  </select>
</div>



        {props.loading && <p>Loading...</p>}
        {allSubmissions}
        {!props.loading && (
          <div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            {pageNumbers.map((page) => (
        <button className={currentPage === page ? 'page-button current-page' : 'page-button'} key={page} onClick={() => setCurrentPage(page)} disabled={page === currentPage}>
         {page}
         </button>
        ))}

            
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </ParentPage>
  );
}

export default Submissions
