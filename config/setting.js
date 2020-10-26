const setting = {
    app: {
        port: 3000
    },
    db: {
        // "username": "linuxdem_click3",
        // "password": "8TqvGz?d5.Kp",
        // "database": "linuxdem_transmissito_a_dev",
        // "host": "dallas166.arvixeshared.com",
        "username": "transmissito",
        "password": "nr$gXJj9Ku",
        "database": "transmissito_a_dev",
        "host": "3.105.130.247",
        "dialect": "mysql",
        "port": "3306",
        "migrationStorage": "sequelize",    
        "migrationStoragePath": "sequelizeMeta.json",    
        "migrationStorageTableName": "Sys_Migration",    
        "migrationStorageTableSchema": "",
        "seederStorage": "sequelize",
        "seederStoragePath": "sequelizeData.json",
        "seederStorageTableName": "Sys_Seeder"
    },
    session : {},
    jwt : {secret:'click3'
    ,secret_forget_password:'click3_forget_password'
    ,secret_verify_email:'click3_verify_email'
    ,secret_booking:'click3_booking'    
    },
    bcrypt:{saltRounds:10},
    application:{
        booking_expiry:30,
        default_image_path: "http://portal.transmissito.com/assets/cms/images/profile/default.png",
        web_url:"http://portal.transmissito.com",
        upload:"public/assets/cms",
        name:"Transmissito",
        website:"https://wwww.transmissito.com",
        coypright:"Copyright @ Transmissito",
        social_media:{
            fb:"javascrtip:;",
            twitter:"javascrtip:;",
        },
       


    },payment:{

        stripe:{
            publishable_key : "pk_test_Q9Q8LheTe0VFThTORIy8uRev",
            secret_key : "sk_test_yEKtZ2nh7WL35f11GcyfAX6a"
        }
    }
    ,email:{
        from_email : 'noreply@transmissito.com', 
        from_name: 'Admin', 
        to_email: "info@transmissito.com",
        to_name: "Admin",
        host: "secureus172.sgcpanel.com",
        port: "465",
        // host: "mail.transmissito.com",
        // port: "2525",
        username: "noreply@transmissito.com",
        password: "W]{1a-=m60{H",
        secure:true,
        subject:''
        // from_email : 'noreply@linuxdemos.me', 
        // from_name: 'Admin', 
        // to_email: "salim@viftech.com.pk",
        // to_name: "Admin",
        // host: "mail.linuxdemos.me",
        // port: "465",
        // // host: "mail.transmissito.com",
        // // port: "2525",
        // username: "noreply@linuxdemos.me",
        // password: "5vSL!Kq-=n}z",
        // secure:false,
        // subject:''
    }
    
};

setting.session = {
    mysqloption: {
        host: setting.db.host,
        port: setting.db.port,
        user: setting.db.username,
        password: setting.db.password,
        database: setting.db.database,
        schema: {
            tableName: 'Sec_Session',
            columnNames: {
                session_id: 'Session_Id',
                expires: 'Session_Name',
                data: 'Session_Data'
            }
        }
    },
    key: 'secretsecret',
    secret: 'transmissito@123',
}


module.exports = setting;