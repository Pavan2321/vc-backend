const introController = (req, res) => {
    res.send(`
      <div>
        <center>
          <h1>WELCOME TO E-COMMERCE CRUD API's</h1>
          <p>Get postman collections bellow for testing local and deployed all api's</p>
          <a href='https://drive.google.com/file/d/1NPcfil5tKIhV_d8Za62-t1xrijs5Pts0/view?usp=sharing' target="_blank" >Postman Collection for localhost API's</a>
          <br />
          <br />
          <a href='https://drive.google.com/file/d/1vhzFGgA6lP2I86B9AVoV9Hk6wqUyO1nY/view?usp=sharing' target="_blank" >Postman Collection for deployed API's</a>
        </center>
      </div>
    `);
  };
  
  module.exports = { introController };