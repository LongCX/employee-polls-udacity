
# Employee Polls Web Application by Udacity

This is a react project and it is final of Udacity Frontend Nanodegree course. This is a single-page app that allows improve collaboration and transparency with in the company by creating polls with two proposed solutions


## Screenshots
![image](https://github.com/LongCX/employee-polls-udacity/assets/38092914/4c0fb0e9-cf99-426f-9b6b-60a94506fe66)
![image](https://github.com/LongCX/employee-polls-udacity/assets/38092914/bf5b6367-7c5c-4e94-ba77-4e136e618d45)
![image](https://github.com/LongCX/employee-polls-udacity/assets/38092914/1785216e-b93b-4078-828f-a52104f78009)


## How to start

Start my project with npm

```bash
  git clone https://github.com/LongCX/employee-polls-udacity
  cd employee-polls-udacity
  npm install
  npm start
```
The project can be viewed in the browser at: http://localhost:3000

Test my project with npm
```bash
  npm test
```

Build my project with npm
```bash
  npm run build
```
My version npm & node
```bash
npm: 10.5.0
nodejs: v20.12.1
```

Know issue:
This app using bcrypt to hash password so will have display waring in console when run command: npm start {Module not found: Error: Can't resolve 'crypto' in ...bcrypt}
```bash
How to fix it:
Path file: node_modules/react-scripts/config/webpack.config.js
Modify as below:
module.exports = function (webpackEnv) {
  ...
  return {
   ...
    resolve: {
      ...
      fallback: {
        crypto: false,
      },
    }
  }
}
```

## Authors

- [@longcx](https://github.com/longCX)
