import { getList } from '@/libs/api'

export default function index({ data }) {
    // console.log(data)
    return (
        <></>
    )
}

export async function getServerSideProps() {

    const param = {
        doctype: 'Poll',
        fields: ["name", 'is_active',  'route', 'question','block_question','creation'],
        page_no: 1,
        filters: { is_active: 1 },
        page_size: 20
    }
    const resp = await getList(param);
    const data = resp;
    return {
        props: { data }
    }

}