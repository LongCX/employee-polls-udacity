export default function formatDate(timestamp) {
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      return new Intl.DateTimeFormat(undefined, options).format(timestamp)
}