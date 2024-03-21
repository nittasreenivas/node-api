const express = require('express')
const app = express()

app.use(express.json())
app.set('view engine', 'pug')

app.get('/',(req,res) => {
    res.send(`welcome to home route `)
})

app.get('/products',async (req,res) => {
    try{
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json()
    let productTitles = data.map((p) => {
        return {title:p.title,id:p.id}
    })
    res.render('Products',{pts:productTitles})
    }catch(err){
        return res.status(500).json({err:`API GOT SOME ERR ${err.message}`})
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`);
        const singleProd = await response.json();
        res.render('SingleProduct', { product:singleProd });
    } catch (err) {
        return res.status(500).json({ err: `API GOT SOME ERR ${err.message}` });
    }
});

const PORT = 4200

app.listen(`${PORT}`,() => {
    console.log(`server is running on PORT ${PORT}`)
})