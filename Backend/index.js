const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
var uniqueIdd
app.use(express.json());
const { ObjectId } = require('bson');
var uniqueIdhelp
var reallyunique
var detailsToStore
var emailpermanent



mongoose.connect('mongodb://127.0.0.1:27017/Campaign');

var taskschema = new mongoose.Schema({
  orgName: String,
  uniqueId: String,
  password: String,
  confirmPassword: String
});
var CampaignSchema = new mongoose.Schema({
  campaignName: String,
  ngoname: String,
  description:String,
  uniqueID: String,
  startDate: Date,
  endDate: Date,
  amount:String,
  walletId:String

});
var DomesticdonorSchema = new mongoose.Schema({
  Name: String,
  emailID: String,
  Address: String,
  PanNo: String,
  walletid:String,
  
  CreatePassword:String,
  ConfirmPassword:String,
  
});

var InternationaldonorSchema = new mongoose.Schema({
  Name: String,
  emailID: String,
  Address: String,
  Passport: String,
  walletid:String,
  CreatePassword:String,
  ConfirmPassword:String

});
var CampaignBalance = new mongoose.Schema({
  from:String,
  userInput: String,
  uniqueID: String,
  campaignName: String,
  objid: String,  
});
var CampaignBalanceBackup = new mongoose.Schema({
  from:String,
  userInput: String,
  uniqueID: String,
  campaignName: String,
  objid: String,  
});

var Ngodebit = new mongoose.Schema({
  
  UniqueID: String,
  Reason: String,
  Amount: String,  
});

var completedcampaign= new mongoose.Schema({
  campaignName: String,
  ngoname: String,
  description:String,
  uniqueID: String,
  startDate: Date,
  endDate: Date,
  amount:String,
  walletId:String,
  from:String,
  userinput:String

  
 
});


var taskmodel = new mongoose.model("NGOsignups", taskschema);
var CampaignDetailsDBmodel = new mongoose.model("CampaignDetailsDB", CampaignSchema);
var DonorDomesticmodel = new mongoose.model("DonorDomesticmodel", DomesticdonorSchema);
var DonorInternationalmodel = new mongoose.model("DonorInternationalmodel", InternationaldonorSchema);
var CampaignBalancemodel = new mongoose.model("CampaignBalancemodel", CampaignBalance);
var Ngodebitmodel = new mongoose.model("Ngodebitmodel", Ngodebit);
var completedcampaignmodel=new mongoose.model("completedcampaignmodel", completedcampaign);
var CampaignBalanceBackup=new mongoose.model("CampaignBalanceBackupmodel", CampaignBalanceBackup);
let temporaryCampaignId = null;


// NGO SIGNUP POST REQUEST

app.post('/api/storeData', async (req, res) => {
  const { orgName, uniqueId, password, confirmPassword } = req.body;
  console.log(req.body); // Log the entire request body for debugging
  console.log(password)
  try {
    const newData = new taskmodel({ orgName, uniqueId, password, confirmPassword });
    await newData.save();

    res.json({
      status: 'success',
      message: 'Data stored successfully in MongoDB!',
      data: { orgName, uniqueId, password, confirmPassword }
    });
  } catch (error) {
    console.error('Error storing data in MongoDB:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

//CAMPAIGN DETAILS POST REQUEST

app.post('/api/storecampaigndetails', async (req, res) => {
  const { campaignName,ngoname, description, uniqueID, startDate, endDate, amount, walletId } = req.body;

  try {
    // Assuming there is only one document in the NGOsignups collection

      // Create a new campaign document with the fetched orgName
      const newData = new CampaignDetailsDBmodel({
        campaignName,
        ngoname,
        description,
        uniqueID, // Set ngoName to the fetched orgName
        startDate,
        endDate,
        amount,
        walletId
      });

      await newData.save();

      res.json({
        status: 'success',
        message: 'Data stored successfully in MongoDB!',
        data: { campaignName}
      });
    }
    catch (error) {
    console.error('Error storing data in MongoDB:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// Domestic Donor  Login Functionality POST REQUEST

app.post('/api/DomesticDonorlogin', async (req, res) => {
  const { emailID, password } = req.body;
  emailpermanent=emailID
  
  
  
  console.log(req.body); // Log the entire request body for debugging

  try {
    // Check if the user with the provided orgName and password exists
    const user = await DonorDomesticmodel.findOne({ emailID, CreatePassword });

    if (user) {
      res.json({
        
        data:"True"
      });
    } else {
      res.json({
        status: 'error',
        message: 'Invalid credentials. Please check your orgName and password.'
      });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// Internationa; Donor Login Functionality POST REQUEST

app.post('/api/InternationalDonorlogin', async (req, res) => {
  const { emailID, CreatePassword } = req.body;

  emailpermanent=emailID
  
  
  
  console.log(req.body); // Log the entire request body for debugging

  try {
    // Check if the user with the provided orgName and password exists
    const user = await DonorDomesticmodel.findOne({ emailID, CreatePassword });
    const intuser= await DonorInternationalmodel.findOne({ emailID, CreatePassword });
    console.log("User Status",user)
    console.log("intuserr Status",intuser)

    if (user !== null || intuser !== null)  {
      res.json({
        
        data:"True"
      });
    } else {
      res.json({
        status: 'error',
        message: 'Invalid credentials. Please check your orgName and password.'
      });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});




//  NGO Login Functionality POST REQUEST

app.post('/api/login', async (req, res) => {
  const { uniqueId, password } = req.body;
  uniqueIdd=uniqueId
  
  console.log(uniqueIdd)
  console.log(req.body); // Log the entire request body for debugging

  try {
    // Check if the user with the provided orgName and password exists
    const user = await taskmodel.findOne({ uniqueId, password });

    if (user) {
      res.json({
        
        data:"True"
      });
    } else {
      res.json({
        status: 'error',
        message: 'Invalid credentials. Please check your orgName and password.'
      });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});





// Fetching All campaign Details Get Request


app.get('/api/getcampaigndetails', async (req, res) => {
  try {
    const allCampaignDetails = await CampaignDetailsDBmodel.find();
    console.log(allCampaignDetails)
    
    res.json({
    
      data: {allCampaignDetails}
    });
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});


// Fetching Only Campaign Details of loggen in NGo GET REQuest

app.get('/api/getcampaigndetails/particular', async (req, res) => {
    try {
      const allCampaignDetails = await CampaignDetailsDBmodel.find({ uniqueID:uniqueIdd});
      console.log(allCampaignDetails)
      
      res.json({
      
        data: {allCampaignDetails}
      });
    } catch (error) {
      console.error('Error retrieving data from MongoDB:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  });

// Domestic Donor Post request
  
app.post('/api/storeData/Domesticdonor', async (req, res) => {
  const {Name,emailID,Address,PanNo,walletid,CreatePassword,ConfirmPassword} = req.body;
  console.log(req.body); // Log the entire request body for debugging
  
  try {
    const newData = new DonorDomesticmodel({Name,emailID,Address,PanNo,walletid,CreatePassword,ConfirmPassword} );
    await newData.save();

    res.json({
      status: 'success',
      message: 'Data stored successfully in MongoDB!',
      data: {PanNo}
    });
  } catch (error) {
    console.error('Error storing data in MongoDB:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// International Donor Post request

app.post('/api/storeData/Internationaldonor', async (req, res) => {
  const {Name,emailID,Address,Passport,walletid,CreatePassword,ConfirmPassword} = req.body;
  console.log(req.body); // Log the entire request body for debugging
  
  try {
    const newData = new DonorInternationalmodel({Name,emailID,Address,Passport,walletid,CreatePassword,ConfirmPassword} );
    await newData.save();

    res.json({
      status: 'success',
      message: 'Data stored successfully in MongoDB!',
      data: {Passport}
    });
  } catch (error) {
    console.error('Error storing data in MongoDB:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// Storing unique ID

app.post('/api/uniquecampaignid', (req, res) => {
  const { campaignId } = req.body;
  uniqueIdhelp=req.body.uniqueID
  
  console.log("Donate now called",uniqueIdhelp)

  // Store the campaignId temporarily
  temporaryCampaignId = campaignId;
  console.log(temporaryCampaignId)

  // Send back the campaignId in the response
  res.json({ campaignId });
});


// SENDING UNIQUE ID
app.get('/api/uniquecampaignid',async (req, res) => {
  // Send back the stored campaignId
  try {
      const allCampaignDetails = await CampaignDetailsDBmodel.find({ _id: new ObjectId(temporaryCampaignId) });
      console.log(temporaryCampaignId)
      
      res.json({
      
        data: {allCampaignDetails}
      });
    } catch (error) {
      console.error('Error retrieving data from MongoDB:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }

});

// POST REQUEST TO STORE BALANCE OF PARTICULAR CAMPAIGN

app.post('/api/storecampaignbalance', async (req, res) => {
  const {  userInput, uniqueID, campaignName, objid } = req.body;
  const from=req.body.tempaccounts
  console.log('Received from:', req.body.tempaccounts);

  try {
    // Find the existing document based on uniqueID
    const existingData = await CampaignBalancemodel.findOne({ uniqueID });

    if (!existingData) {
      console.log('New DOC CALLED');
      // If no existing document is found, create a new one
      const newData = new CampaignBalancemodel({
        from,
        userInput,
        uniqueID,
        campaignName,
        objid,
      });

      await newData.save();

      res.json({
        status: 'success',
        message: 'Data stored successfully in MongoDB!',
        data: { newData },
      });
    } else {
      console.log('I am called');
      // Update the userInput and from fields in the existing document
      await CampaignBalancemodel.updateOne(
        { uniqueID },
        { $set: { userInput: parseFloat(existingData.userInput) + parseFloat(userInput), from } }
      );

      res.json({
        status: 'success',
        message: 'UserInput and from fields updated successfully in MongoDB!',
        data: { uniqueID, userInput: existingData.userInput + userInput, from },
      });
    }
  } catch (error) {
    console.error('Error updating data in MongoDB:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});




//  GET REQUEST TO SEND BALANCE OF ALL CAMPAIGN

app.get('/api/storecampaignbalance',async (req, res) => {
  
  try {
      const allCampaignDetails = await CampaignBalancemodel.find();
      
      
      res.json({
      
        data: {allCampaignDetails}
      });
    } catch (error) {
      console.error('Error retrieving data from MongoDB:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }

});

//  GET REQUEST TO SEND BALANCE OF PARTICULAR CAMPAIGN

app.get('/api/storeparticularcampaignbalance',async (req, res) => {
  
  try {
      const allCampaignDetails = await CampaignBalancemodel.find({uniqueID:uniqueIdd});
      
      
      res.json({
      
        data: {allCampaignDetails}
      });
    } catch (error) {
      console.error('Error retrieving data from MongoDB:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }

});


// POST REQUEST TO DEBIT THE FUNDS OF A PARTICULAR NGO AFTER THE DONATION

app.post('/api/storeData/api/debitbalance', async (req, res) => {
  const { UniqueID, Reason, Amount } = req.body;

  try {
    const existingData = await CampaignBalancemodel.findOne({ uniqueID: UniqueID });
  
    if (!existingData) {
      return res.status(404).json({ error: 'Document not found' });
    }
  
    console.log('Existing amount:', existingData.userInput);
    console.log('UniqueID:', UniqueID);
  
    const exAmount = parseFloat(existingData.userInput);
    console.log('Parsed existing amount:', exAmount);
  
    const updatedUserInput = exAmount - parseFloat(Amount);
    console.log('Updated UserInput:', updatedUserInput);
  
    // Update userInput field in CampaignBalancemodel
    await CampaignBalancemodel.updateOne(
      { uniqueID: UniqueID },
      { $set: { userInput: updatedUserInput } }
    );
  
    // Create a new document in Ngodebitmodel
    const newData = new Ngodebitmodel({ UniqueID, Reason, Amount });
    await newData.save();
  
    res.json({
      status: 'success',
      message: 'Data updated and stored successfully in MongoDB!',
      data: { UniqueID, updatedUserInput, newData },
    });
  } catch (error) {
    console.error('Error updating/storing data in MongoDB:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
  

})

// Help 
app.post('/api/help', (req, res) => {
  var really  = req.body;
  reallyunique=req.body.helpingid
  
  console.log("Donate now called",reallyunique)



  // Send back the campaignId in the response
  res.json({ reallyunique });
});



// GET REQUEST TO  SHOW THE DEBIT HISTORY OF PAR CAMPAIGN

app.get('/api/storeData/api/debitbalance', async (req, res) => {
  try {
    console.log("Before finding, uniqueIdhelp:", reallyunique);
    
    const allCampaignDetails = await Ngodebitmodel.find({ UniqueID: reallyunique});
    
    console.log("After finding, allCampaignDetails:", allCampaignDetails);
    
    res.json({
      data: { allCampaignDetails }
    });
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
  }
});




app.get('/api/storeData/api/debitbalance', async (req, res) => {
  try {
    console.log("Before finding, uniqueIdhelp:", reallyunique);
    
    const allCampaignDetails = await Ngodebitmodel.find({ UniqueID: reallyunique});
    
    console.log("After finding, allCampaignDetails:", allCampaignDetails);
    
    res.json({
      data: { allCampaignDetails }
    });
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
  }
});

// GET REQUEST TO COMPARE Required amount aND CURRENT balance  FOR NGO

app.get('/api/compare', async (req, res) => {
  try {
    
    console.log(uniqueIdd)
    const allCampaignDetailsupper = await CampaignDetailsDBmodel.find({ uniqueID: uniqueIdd});
    const allCampaignDetailscurrent = await CampaignBalancemodel.find({ uniqueID: uniqueIdd});
    const Upperlimit = allCampaignDetailsupper.map(campaign => campaign.amount);
    console.log("Amount values from allCampaignDetailsupper:", Upperlimit);
    
    // Extracting only the "userInput" values from allCampaignDetailscurrent
    const Currentlimit = allCampaignDetailscurrent.map(campaign => campaign.userInput);
    console.log("UserInput values from allCampaignDetailscurrent:", Currentlimit);
    res.json({
      data: {Upperlimit, Currentlimit }
    });
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
  }
});
app.get('/api/certificate', async (req, res) => {
  try {


    var detailsToStore =[]
    var fromstore=[]
    var userinp=[]
    var finalresult=false

    
    const allCampaignDetailsforbackup = await CampaignBalancemodel.find();
const campaignBalanceDataToCopy = allCampaignDetailsforbackup.map(doc => {
  const { _id, ...rest } = doc._doc;
  return { ...rest };
});

// Check for existing entries in CampaignBalanceBackupModel before insertion
const existingEntries = await CampaignBalanceBackup.find();

const newEntriesToInsert = campaignBalanceDataToCopy.filter(newEntry => {
  // Check if the new entry already exists in CampaignBalanceBackupModel
  return !existingEntries.some(existingEntry => (
    existingEntry.from === newEntry.from &&
    existingEntry.userInput === newEntry.userInput 
    // Add more conditions based on your schema
  ));
});

// Insert only new entries
if (newEntriesToInsert.length > 0) {
  await CampaignBalanceBackup.insertMany(newEntriesToInsert);
}













    const allCampaignDetailsupper = await CampaignDetailsDBmodel.find();
    const allCampaignDetailscurrent = await CampaignBalancemodel.find();
    const Upperlimit = allCampaignDetailsupper.map(campaign => campaign.amount);
    console.log("Amount values from allCampaignDetailsupper:", Upperlimit);

    // Extracting only the "userInput" values from allCampaignDetailscurrent
    const Currentlimit = allCampaignDetailscurrent.map(campaign => campaign.userInput);
    console.log("UserInput values from allCampaignDetailscurrent:", Currentlimit);
    
    
   
    const isThresholdReached = Currentlimit.some(limit => limit >= Upperlimit);

    if (isThresholdReached) {
      const indicesToStore = Currentlimit.reduce((indices, limit, index) => {
        if (limit >= Upperlimit[index]) {
          indices.push(index);
        }
        return indices;
      }, []);
      console.log(indicesToStore);
      const onlyfrom = indicesToStore.map(index => {
        // Create a new document without the _id field
        const { _id, ...rest } = allCampaignDetailscurrent[index]._doc;
        return rest;
      });
      for (let i = 0; i < onlyfrom.length; i++) {
        console.log("Here I am", onlyfrom[i].from);
        fromstore.push(onlyfrom[i].from);
    userinp.push(onlyfrom[i].userInput);
  
       
      }
      
      console.log("GODDD",fromstore,userinp)

      if (indicesToStore.length > 0) {
         detailsToStore = indicesToStore.map(index => {
          // Create a new document without the _id field
          const { _id, ...rest } = allCampaignDetailsupper[index]._doc;
          return { ...rest};
        });
      }


      const finalDataForm = detailsToStore.map((detail, i) => ({ ...detail, from: fromstore[i], userinput: userinp[i] }));

      console.log("Final Data Form:", finalDataForm);
        // Remove entries from CampaignDetailsDBmodel based on indices
        await CampaignDetailsDBmodel.deleteMany({ _id: { $in: indicesToStore.map(index => allCampaignDetailsupper[index]._id) } });

        // Remove entries from CampaignBalancemodel based on indices
        await CampaignBalancemodel.deleteMany({ _id: { $in: indicesToStore.map(index => allCampaignDetailscurrent[index]._id) } });

      
        // Iterate over finalDataForm and update existing documents or insert new ones
        for (const data of finalDataForm) {
          const query = { from: data.from, userinput: data.userinput,campaignName:data.campaignName,ngoname:data.ngoname,description:data.description,uniqueID:data.uniqueID,startDate:data.startDate, endDate: data.endDate, amount:data.amount };
         
    
          // Use $addToSet to add to the array only if the entry doesn't exist
          await completedcampaignmodel.updateOne(query, { $addToSet: { entries: data } }, { upsert: true });
        }
        

        console.log("Details stored in the new database:", finalDataForm);
        console.log(emailpermanent)


        const loggedinuserdomestic = await DonorDomesticmodel.findOne({ emailID:emailpermanent });
        const loggedinuserinternational= await DonorInternationalmodel.findOne({ emailID:emailpermanent });
        console.log(loggedinuserdomestic,"Domesticccccc",loggedinuserinternational)
      
        if (loggedinuserdomestic !== null){
        
          var walletcompare=loggedinuserdomestic.walletid
          console.log(walletcompare)

          var result= await completedcampaignmodel.findOne({ from:walletcompare });
          if (result !== null)
          {
          console.log("Result",result)
          finalresult=true
          }
          else{
            console.log("GONEEEEEE")
          }
        }
        if (loggedinuserinternational !== null){
        
          var walletcompare=loggedinuserinternational.walletid
          console.log(walletcompare)

          var result= await completedcampaignmodel.findOne({ from:walletcompare });
          if (result !== null)
          {
          finalresult=true
          console.log("Result",result)
          }
          else{
            console.log("GONEEEEEE")
          }
        
      }
    }

    res.json({
      data: { finalresult }
    });
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
  }
});



// PAN CARD TRACKING
app.post('/api/pancard', (req, res) => {
  var pancardnumber  = req.body;
  
  
  console.log("Pan card entered")



  // Send back the campaignId in the response
  res.json({ data:pancardnumber });
});


app.get('/api/pancard',(req,res)=>
{
  res.json()
})

app.post('/api/pancardtransaction', (req, res) => {
  var pancardnumber  = req.body;
  
  
  console.log("Pan card entered")



  // Send back the campaignId in the response
  res.json({  });
});

app.listen(3001, function () {
  console.log("Server is running on port 3001");
});