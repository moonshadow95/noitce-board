// Time Formatter
const timeFormatter = (createdAt) => {
    const milliSeconds = new Date() - new Date(createdAt);
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 2) return `${Math.floor(days)}일 전`;
    if (days >= 2) {
        const dateObj = new Date(createdAt);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const date = dateObj.getDate();
        return `${year}년 ${month}월 ${date}일`;
    }
};
export default timeFormatter;