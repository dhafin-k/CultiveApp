import imageKit from '@imagekit/nodejs';

var imagekit = new imageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndPoint : process.env.IMAGEKIT_URL_ENDPOINT
});

export default imagekit;