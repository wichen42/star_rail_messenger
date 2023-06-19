
function useConvertDate () {
    function convertDate (data) {
        const fireBaseTime = new Date(
            data.seconds * 1000 + data.nanoseconds / 1000000
        );

        return fireBaseTime.toLocaleDateString();
    };

    return convertDate;
};

export default useConvertDate;