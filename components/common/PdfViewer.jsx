


import { useState } from "react";
import { Page,Document } from "react-pdf";

function PdfViewer() {
    const [numPages,setNumPages] = useState('')
    const [pageNumber,setPageNumber] = useState('')
    const onDocLoadSuccess=()=>{
        setNumPages(2)
        setPageNumber(1)
     }
    return ( <>
       <Document file={'https://www.africau.edu/images/default/sample.pdf'} onLoadSuccess={onDocLoadSuccess}>
          <Page height={500} pageNumber={pageNumber}/>
       </Document>
    </> );
}

export default PdfViewer;