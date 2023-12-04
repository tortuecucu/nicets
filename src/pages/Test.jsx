import { Notices } from "../components/notice/Notice"
import TestContent from "../components/notice/modals/TestContent"

const Test = () => {
    return (<>
        <Notices>
            <Notices.Item id='welcome' dispatcher={{
                shouldDisplay: true,
                afterDisplay: () => true
            }} element={<TestContent />} />
            <Notices.Item id='second' dispatcher={{
                shouldDisplay: false,
                afterDisplay: () => true
            }} element={<TestContent />} />
        </Notices>
    </>)
}

export default Test