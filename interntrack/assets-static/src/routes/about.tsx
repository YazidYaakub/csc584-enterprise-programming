import React from 'react';
import { Button } from '@/components/ui/button'

export const About = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
      {/* Company Introduction Section */}
      <section style={{ marginBottom: '40px' }}>
      <img
  src="edutech-solutions.png"
  alt="Edutech Solutions Logo"
  style={{
    height: '150px',
    marginBottom: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    padding: '10px',
    display: 'block', // Makes the image a block element
    margin: '0 auto', // Centers the image horizontally
  }}
/>
        <h1 style={{ fontWeight: 'bold' }}>WELCOME TO EDUTECH-SOLUTION</h1>
        <p>
        Edutech-Solution is an innovative platform that streamlines internship and student activity management, providing seamless solutions for both universities and companies.
        </p>
      </section>

      {/* Mission and Vision Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontWeight: 'bold' }}>Our Mission</h2>
        <p>
        To bridge the gap between students and the industry by fostering an efficient and collaborative ecosystem that drives mutual growth and success.
        </p>

        <h2 style={{ fontWeight: 'bold' }}>Our Vision</h2>
        <p>
          A future where every student has access to a streamlined process for career development and real-world experience.
        </p>
      </section>

      {/* Key Features Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontWeight: 'bold' }}> Key Features</h2>
        <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left', margin: 'auto', maxWidth: '400px' }}>
          <li>✔ Comprehensive student activity tracking</li>
          <li>✔ Tools for seamless collaboration among stakeholders</li>
          <li>✔ Real-time progress monitoring</li>
          <li>✔ Detailed reports for educators and companies</li>
        </ul>
      </section>

      <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
      {/* Team Projects Section */}
      <section>
        <h2 style={{ fontWeight: 'bold' }}>TEAM</h2>
        <p>To optimize our work, we have organized into two specialized teams based on project requirements: one team focuses on projects utilizing Oracle Database, while the other specializes in Java technologies, including the MVC framework, JSP, and Servlets.</p>

        {/* Team CSC584 */}
        <h3 style={{ fontWeight: 'bold', marginTop: '20px' }}>TEAM PROJECT CSC584</h3>
        <div
  style={{
    display: 'flex',
    flexWrap: 'nowrap', // Prevent wrapping, display all images in one row
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px',
    overflowX: 'auto', // Enables horizontal scrolling if the images exceed container width
  }}
>
  {[
    { name: 'ROSMI BIN ABD RAZAK', src: 'rosmi.png' },
    { name: 'MUHAMMAD HARITH IQBAL BIN MOHD HANIZUN', src: 'iqbal.png' },
    { name: 'MOHAMAD ZAFIR BIN NADZRI', src: 'zafir.png' },
    { name: 'MOHAMAD TAUFIK BIN ABD RAHMAN', src: 'taufik.png' },
    { name: 'MOHAMMAD YAZID BIN AG MOHD YAAKUB', src: 'yazid.png' },
  ].map((member) => (
    <div
      key={member.name}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '150px', // Ensure each image has a fixed width, ok 
      }}
    >
      <img
        src={member.src}
        alt={member.name}
        style={{
          height: '120px',
          width: '120px',
          borderRadius: '8px',
          marginBottom: '10px',
        }}
      />
      <p style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
        {member.name}
      </p>
    </div>
  ))}
</div>


        {/* Team ICT502  */}
        <h3 style={{ fontWeight: 'bold', marginTop: '20px' }}>TEAM PROJECT ICT502</h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          {[
            { name: 'ROSMI BIN ABD RAZAK', src: 'rosmi.png' },
            { name: 'MUHAMMAD HARITH IQBAL BIN MOHD HANIZUN', src: 'iqbal.png' },
            { name: 'MOHAMAD ZAFIR BIN NADZRI', src: 'zafir.png' },
            { name: 'MOHAMAD ZUBAIR AZIM', src: 'zubair.png' },
          ].map((member) => (
            <div
              key={member.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '150px',
              }}
            >
              <img
                src={member.src}
                alt={member.name}
                style={{
                  height: '120px',
                  width: '120px',
                  borderRadius: '8px',
                  marginBottom: '10px',
                }}
              />
              <p style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
                {member.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
    <Button form="login-form">
                HOME
              </Button>
    </div>

    
  );
};
//end of update by rosmi