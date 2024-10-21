import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import { useState } from 'react';
import { insert_web_special_registration } from '@/libs/api';
const RegistrationForm = ({ visible, hide }) => {
    const { register, handleSubmit, formState: { errors },reset } = useForm();
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState()
    const registerForm = async (data) => {
        // console.log(data,"data")
        setFormData(data)
        if (data) {
            let curRoute = router.asPath.split('/')[2] + "/" + router.asPath.split('/')[3]
            const res = await insert_web_special_registration({ ...data, from_page: curRoute });
            if (res.status === "Success") {
                // console.log("Success");
                toast.success(res.message.message)
                reset();
                hide(data)
            } else {
                toast.error(res.message.message)
            }
        }
    }
    return (
        <>
            <div className={`registration_form`}>
                <Rodal visible={visible} animation='slideUp' onClose={hide}>
                    <div>
                        <h6 className='text-[16px] font-semibold nunito py-[15px]'>To secure your spot for the webinar, kindly provide your details below</h6>
                        <form onSubmit={handleSubmit((data) => registerForm(data))} autoComplete='off'>
                            <div className={`flex flex-col pb-[10px] relative`}>
                                <input placeholder='Email' className={`${styles.register_input}`} {...register('email', { required: { value: true, message: 'Email is required' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email" } },)} />
                                {/* {errors?.email && <p className={`${styles.danger}`}>{errors.email.message}</p>} */}
                            </div>

                            <div className='grid grid-cols-2 items-center justify-between pb-[10px] gap-[10px]'>
                                <div className={``}>
                                    <input placeholder='First Name' className={`${styles.register_input}`} {...register('first_name', { required: { value: true, message: 'First Name is required' } },)} />
                                    {/* {errors?.first_name && <p className={`${styles.danger}`}>{errors.first_name.message}</p>} */}
                                </div>

                                <div className={``}>
                                    <input placeholder='Last Name' className={`${styles.register_input}`} {...register('last_name', { required: { value: true, message: 'Last Name is required' } })} />
                                    {/* {errors?.last_name && <p className={`${styles.danger}`}>{errors.last_name.message}</p>} */}
                                </div>
                            </div>

                            <div className={`pb-[10px]`}>
                                <input placeholder='Company' className={`${styles.register_input}`} {...register('company', { required: { value: true, message: 'Company is required' } })} />
                                {/* {errors?.company && <p className={`${styles.danger}`}>{errors.company.message}</p>} */}
                            </div>

                            <div className={`pb-[10px]`}>
                                <input placeholder='Department' className={`${styles.register_input}`} {...register('department', { required: { value: true, message: 'Department is required' } })} />
                                {/* {errors?.department && <p className={`${styles.danger}`}>{errors.department.message}</p>} */}
                            </div>

                            <div className={`pb-[10px]`}>
                                <input placeholder='Location' className={`${styles.register_input}`} {...register('location', { required: { value: true, message: 'Location is required' } })} />
                                {/* {errors?.location && <p className={`${styles.danger}`}>{errors.location.message}</p>} */}
                            </div>

                            <div className={`pb-[10px]`}>
                                <input type='number' placeholder='Phone' className={`${styles.register_input}`} {...register('phone', { required: { value: true, message: 'Mobile Number is required' }, pattern: { value: /^\d{10}$/, message: "Please enter a valid Mobile Number" } },)} />
                                {/* {errors?.phone && <p className={`${styles.danger}`}>{errors.phone.message}</p>} */}
                            </div>

                            <button type="submit" onClick={() => setSubmitted(true)} className={`${styles.loginBtn} my-[10px]`}>Register</button>
                            {(submitted && !formData) && <p className={`${styles.danger} !text-[13px] text-center`}>All fields are required</p>}
                        </form>
                    </div>
                </Rodal>
            </div>
        </>
    )
}

export default RegistrationForm