const mod = require("../models/model");
const ApiFeatures = require("../utils/apifeatures");

const catchErr = require("../utils/catchasync");
const AppError = require("../utils/apierror");
const app = require("../app");


exports.get1 = catchErr(async (req, res, next) => {
  
  let data = await mod.findOne({ _id: req.params.x });

  if (!data) {
    return next(new AppError("tour not found",404))
  }

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getting = catchErr(async (req, res, next) => {
  const ob = new ApiFeatures(mod.find(), req.query);
  ob
  .filtring()
  .sorting()
  .fields()
  .pagination();

  let data = await ob.query;

  if (!data) return next(err);

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.update = catchErr(async (req, res, next) => {
  await mod.findOneAndUpdate({ _id: req.params.x }, req.body);
  res.status(200).json({
    status: "success",
    data: req.body,
  });
});

exports.posting = catchErr(async (req, res, next) => {
  await mod.create(req.body);
  res.status(200).json({
    status: "success",
    data: req.body,
  });
});

exports.aggregate = catchErr(async (req, res, next) => {

  let data = await mod.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 },
      },
    },
    {
      $group: {
        _id: null,
        avgratings: { $avg: "$ratingsAverage" },
        num: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.del=catchErr(async (req,res,next)=>{
  const done=await mod.findOneAndDelete({_id: req.params.x})
  if(!done)
    return next(new AppError("data not found too delete",404))

  res.status(200).json({
    status: "success",
    done
  });
})



