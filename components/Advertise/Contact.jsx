import React from 'react'

const Contact = ({ data }) => {
    return (
        <>
            <section class="contactUs lg:mb-[20px]" id="contactUs">
                <div class="container md:px-[10px]">

                    <h2>
                        {data.heading}
                    </h2>
                    <div class="customHR4"></div>

                    <div class="customSpace35"></div>


                    <div class="grid grid-cols-1">
                        <div class="contactUsBox">
                            <h3 class="contactUsPosition">
                                {data.inner_heading1}
                            </h3>
                            {data.editorial_queries.map(res => {
                                return (
                                    <div key={res.name}>
                                        <h4 class="contactUsName">
                                            {res.name}
                                        </h4>
                                        <p class="contactUsEmail">
                                            <a href={`mailto:${res.email}`} target="_blank" rel="noopener noreferrer">{res.email}</a> , <a href={`tel:${res.number}`} target="_blank" rel="noopener noreferrer">{res.number}</a>
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>


                    <div class="grid grid-cols-2 md:grid-cols-1 ">
                        {/* <div class="col-lg-6 col-md-12"> */}
                        <div class="contactUsBox">
                            <h3 class="contactUsPosition">
                                {data.inner_heading2}
                            </h3>

                            {data.technology_queries.map(res => {
                                return (
                                    <div key={res.name}>
                                        <h4 class="contactUsName">
                                            {res.name}
                                        </h4>
                                        <p class="contactUsEmail">
                                            <a href={`mailto:${res.email}`} target="_blank" rel="noopener noreferrer">{res.email}</a> , <a href={`tel:${res.number}`} target="_blank" rel="noopener noreferrer">{res.number}</a>
                                        </p>
                                    </div>
                                )
                            })}

                            {/* <p class="contactUsEmail">
                                    <a href="mailto:rohitpandey@imagesgroup.in" target="_blank" rel="noopener noreferrer">rohitpandey@imagesgroup.in</a> | <a href="tel:8409275306" target="_blank" rel="noopener noreferrer">+918409275306</a>
                                </p>
                                <h4 class="contactUsName">
                                    Himanshu Rawal
                                </h4>
                                <p class="contactUsEmail">
                                    <a href="mailto:himanshurawal@imagesgroup.in" target="_blank" rel="noopener noreferrer">himanshurawal@imagesgroup.in</a> , <a href="tel:9899095152" target="_blank" rel="noopener noreferrer">+919899095152</a>
                                </p> */}
                        </div>
                        {/* </div> */}

                        {/* <div class="col-lg-6 col-md-12"> */}
                        <div class="contactUsBox">
                            <h3 class="contactUsPosition">
                                {data.inner_heading3}
                            </h3>
                            {data.real_estate_queries.map(res => {
                                return (
                                    <div key={res.name}>
                                        <h4 class="contactUsName">
                                            {res.name}
                                        </h4>
                                        <p class="contactUsEmail">
                                            <a href={`mailto:${res.email}`} target="_blank" rel="noopener noreferrer">{res.email}</a> , <a href={`tel:${res.number}`} target="_blank" rel="noopener noreferrer">{res.number}</a>
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                        {/* </div> */}
                    </div>

                </div>
            </section>
        </>
    )
}

export default Contact