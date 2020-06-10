var path = require('path');

var express = require('express');
var fs = require('fs');
var multer = require("multer");
var app = express();
var bodyParser = require('body-parser');
var port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


var upload = multer({ storage: storage });

app.post('/uploads/img', upload.array('img', 2), function (req, res) {
    
    var files = req.files;

    
    var result = {};
    if (!files[0]) {
        result.code = 1;
        result.errMsg = '�ϴ�ʧ��';
    } else {
        result.code = 0;
        result.data = {
            url: files[0].path
        }
        result.errMsg = '�ϴ��ɹ�';
    }
    res.end(JSON.stringify(result));
});

app.use(express.static('public'));

app.get('/record', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/public/record.html');
});

app.get('/Home', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/public/index.html');
});

app.get('/about', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/public/about.html');
});


app.post('/add', (req, res) => {
    writeJson(req.body.data);
    res.send("success");
});


app.get('/search', (req, res) => {
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return console.error(err);
        }
        
        jsonArr = JSON.parse(data.toString());
        res.json(JSON.stringify(jsonArr));
    });
});


app.post('/update', async (req, res) => {
    updateData(req.body.data);
    res.send("success");
});



app.post('/del', async  (req, res) => {
    deleteData(req.body.id);
    res.send("success");
});

var filePath = 'recordData.json';


function writeJson(postData) {
    var myobj = JSON.parse(postData);
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return console.error(err);
        }
        
        var jsonArr = JSON.parse(data.toString());
        myobj.id = jsonArr[jsonArr.length - 1].id + 1;
        jsonArr.push(myobj);
        var str = JSON.stringify(jsonArr);
        
        fs.writeFile(filePath, str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('success');
        });
    });
}


function deleteData(id) {
    console.log(filePath);
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return console.error(err);
        }
        
        console.log(data);
        var jsonArr = JSON.parse(data.toString());
        console.log(jsonArr);
        var newArr = [];
        for (var i = 0; i < jsonArr.length; i++) {
            if (jsonArr[i].id != id) {
                newArr.push(jsonArr[i]);
            }
        }
        console.log(newArr);
        var str = JSON.stringify(newArr);
       
        fs.writeFile(filePath, str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('ɾ���ɹ�');
        });
    });
}


function updateData(obj) {
    var myobj = JSON.parse(obj);
 
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return console.error(err);
        }
        
        var jsonData = JSON.parse(data.toString());

        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].id == myobj.id) {
                jsonData[i].url = myobj.url;
                jsonData[i].name = myobj.name;
                jsonData[i].date = myobj.date;
            }
        }
        var str = JSON.stringify(jsonData);
        
        fs.writeFile(filePath, str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('success');
        });


    });
}


function readJson() {
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return console.error(err);
        }
        
        jsonArr = JSON.parse(data.toString());
        arr = jsonArr;
    });
}



app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("== Server listening on port", port);
});
