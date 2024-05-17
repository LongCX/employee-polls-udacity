export const formatDate = (timestamp) => {
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
export const getRandomAvatarPathUrl = () => {
  const avatars = [
    '/assets/images/avatar/Avatar_1.jpg',
    '/assets/images/avatar/Avatar_2.jpg',
    '/assets/images/avatar/Avatar_3.jpg',
    '/assets/images/avatar/Avatar_4.jpg',
    '/assets/images/avatar/Avatar_5.jpg',
    '/assets/images/avatar/Avatar_6.jpg',
    '/assets/images/avatar/Avatar_7.jpg',
    '/assets/images/avatar/Avatar_8.jpg',
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

export const initUser = ['sarahedo', 'tylermcginnis', 'mtsamis', 'zoshikanlu'];