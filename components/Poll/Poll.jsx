
import React, { useEffect, useState } from 'react';
import { updatePollOptionValue } from '../../libs/api';
import { ToastContainer, toast } from 'react-toastify';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
function Poll({ data, ipAddress }) {
    let [pollData, setPollData] = useState([])
    const change_option = ($event, qsn) => {
        console.log($event, qsn);
        qsn.ans = $event
    }
    useEffect(() => {
        pollData = data
        setPollData(pollData)
    }, [pollData])
    const updatePollOption = async (event, qsn) => {
        console.log(qsn);
        if (qsn && qsn.ans) {
            let payload = {
                poll_id: qsn.name,
                answer: qsn.ans,
                ip_address: ipAddress
            }
            const resp = await updatePollOptionValue(payload)
            if (resp.status == 'Success') {
                toast.success('Updated successfully.');
                event.target.disabled = true
                event.target.classList.add('opacity-70')
            }
            else toast.failed('Something Went Wrong! Try Again Later.');
        }
    }
    return (
        <>
            
            {pollData && pollData.map((qsn, index) => (
                <div key={qsn.name} className='border-light-gray divide-y border rounded flex-[0_0_calc(33.33%_-_20px)] mb-[20px]'>
                    <div className='font-semibold p-[20px]'>{qsn.question}</div>
                    <div className='h-[200px] overflow-auto px-[15px] pb-[10px]'>
                        <RadioGroup onChange={($event) => change_option($event, qsn)} defaultValue={qsn.answer} className='pt-[10px]'>
                            <Stack spacing={5} direction='column'>
                                {qsn.options.map((ans, opt_index) =>
                                (
                                    <div key={ans + opt_index} className='flex items-center justify-between  px-[15px] rounded py-[5px]'>
                                        <Radio colorScheme='red' value={ans.option} isDisabled={qsn.answer} >
                                            <p className='flex-1 w-full min-w-[200px]'> {ans.option}</p>
                                        </Radio>
                                        <p className=' px-[4px] rounded'>
                                            {ans.voting_percentage}%
                                        </p>
                                    </div>

                                ))}
                            </Stack>
                        </RadioGroup>

                        {/* <div key={ans+opt_index} className='px-[10px] pt-[10px]'>
                                <input type='radio' name={"poll_"+index} id={ans.option+index} value={ans.option} onChange={($event) => change_option($event, qsn)}
                                    className='cursor-pointer' checked={qsn.answer == ans.option ? 'checked':''}></input>
                                <label htmlFor={ans.option+index} className='pl-[10px] cursor-pointer'>{ans.option}</label>
                            </div> */}

                    </div>

                    <div className='p-[10px] text-right'>
                        <button id={qsn.name} className={`primary_button px-[20px] py-[3px] ${qsn.poll_status && 'opacity-70'}`} disabled={qsn.poll_status && true} onClick={($event) => updatePollOption($event, qsn)}>{qsn.answer?'Voted':'Vote'}</button>
                    </div>
                </div>
            ))}
            <ToastContainer position={'bottom-right'} autoClose={2000} />
        </>
    );
}
export default Poll;

