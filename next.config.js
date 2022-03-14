module.exports = {
  images: {
    domains: ['res.cloudinary.com']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/post',
        permanent: true
      }
    ]
  }
}