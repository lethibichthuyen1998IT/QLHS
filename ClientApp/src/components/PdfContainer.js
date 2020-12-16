import React from 'react';

export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <section>
      <section>
        <button onClick={createPdf}>Xuất file PDF</button>
      </section>
      <section ref={bodyRef}>
        {props.children}
      </section>
    </section>
  )
}