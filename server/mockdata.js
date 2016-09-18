'use strict'

let request = require('request-promise')
let Promise = require('bluebird')

let data = [
  { lat: 40.7499427, long: -73.9909421, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7499427, long: -73.9909421, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7554202, long: -73.9823776, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7564316, long: -73.9842868, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7356570, long: -74.1723667, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7499427, long: -73.9909421, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7572369, long: -73.9844131, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7564251, long: -73.9855534, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7571604, long: -73.9833158, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7554202, long: -73.9823776, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7578857, long: -73.9837592, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7356570, long: -74.1723667, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7581118, long: -73.9834290, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7564592, long: -73.9845479, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7574214, long: -73.9838645, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7578857, long: -73.9837592, uid: 'f74b97a0-7d79-11e6-bb95-cfdbee49a7af' },
  { lat: 40.7588950, long: -73.9851310, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7572369, long: -73.9844131, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7567555, long: -73.9843377, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7356570, long: -74.1723667, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7571604, long: -73.9833158, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7564251, long: -73.9855534, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7574214, long: -73.9838645, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7499427, long: -73.9909421, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7560300, long: -73.9813370, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7560300, long: -73.9813370, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7578857, long: -73.9837592, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7554202, long: -73.9823776, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7588950, long: -73.9851310, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7588950, long: -73.9851310, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7571560, long: -73.9848030, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7564251, long: -73.9855534, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7571604, long: -73.9833158, uid: 'f8bb7b50-7d79-11e6-8f6b-53af1a3376e0' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7581118, long: -73.9834290, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7588950, long: -73.9851310, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7356570, long: -74.1723667, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7588465, long: -73.9843260, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7588465, long: -73.9843260, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7564592, long: -73.9845479, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7560300, long: -73.9813370, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7567555, long: -73.9843377, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7588465, long: -73.9843260, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7567555, long: -73.9843377, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fb8e4a60-7d79-11e6-80c8-a9d9762ebf68' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7560300, long: -73.9813370, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7571560, long: -73.9848030, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7563450, long: -73.9822170, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7581118, long: -73.9834290, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7574214, long: -73.9838645, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7588950, long: -73.9851310, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7571604, long: -73.9833158, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7559406, long: -73.9821117, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7560300, long: -73.9813370, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7567555, long: -73.9843377, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7356570, long: -74.1723667, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7564592, long: -73.9845479, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7588465, long: -73.9843260, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7564316, long: -73.9842868, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7572369, long: -73.9844131, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7563450, long: -73.9822170, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7571560, long: -73.9848030, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7560300, long: -73.9813370, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7571560, long: -73.9848030, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7571560, long: -73.9848030, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fbe6f1b0-7d79-11e6-91ca-f7933ceeb8fc' },
  { lat: 40.7572369, long: -73.9844131, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7581118, long: -73.9834290, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7559406, long: -73.9821117, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7588950, long: -73.9851310, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7560300, long: -73.9813370, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7567555, long: -73.9843377, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7574214, long: -73.9838645, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7588950, long: -73.9851310, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7356570, long: -74.1723667, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7588465, long: -73.9843260, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7574214, long: -73.9838645, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7581118, long: -73.9834290, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7567555, long: -73.9843377, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7564316, long: -73.9842868, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7588950, long: -73.9851310, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7560300, long: -73.9813370, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7571560, long: -73.9848030, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7571560, long: -73.9848030, uid: 'fc4f0250-7d79-11e6-8e56-5b1988d7a4f3' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7356570, long: -74.1723667, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7567555, long: -73.9843377, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7567555, long: -73.9843377, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7588950, long: -73.9851310, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7564592, long: -73.9845479, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7559406, long: -73.9821117, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7571604, long: -73.9833158, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7574214, long: -73.9838645, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7560300, long: -73.9813370, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7581118, long: -73.9834290, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7574214, long: -73.9838645, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7563450, long: -73.9822170, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7563450, long: -73.9822170, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7588950, long: -73.9851310, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7567555, long: -73.9843377, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7588950, long: -73.9851310, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7581118, long: -73.9834290, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7588950, long: -73.9851310, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7588950, long: -73.9851310, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7571604, long: -73.9833158, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7564592, long: -73.9845479, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7574214, long: -73.9838645, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7567555, long: -73.9843377, uid: 'fc841c10-7d79-11e6-8752-bb4b8761251d' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7588465, long: -73.9843260, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7560300, long: -73.9813370, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7560300, long: -73.9813370, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7574214, long: -73.9838645, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7564251, long: -73.9855534, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7564316, long: -73.9842868, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7571560, long: -73.9848030, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7559406, long: -73.9821117, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7571862, long: -73.9812342, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7574214, long: -73.9838645, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7567555, long: -73.9843377, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7563450, long: -73.9822170, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7571604, long: -73.9833158, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7564251, long: -73.9855534, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7564316, long: -73.9842868, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7563450, long: -73.9822170, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7588950, long: -73.9851310, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7559406, long: -73.9821117, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7578857, long: -73.9837592, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7571560, long: -73.9848030, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7571560, long: -73.9848030, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7572369, long: -73.9844131, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7567555, long: -73.9843377, uid: 'fcc2abb0-7d79-11e6-8206-5701d395bc77' },
  { lat: 40.7564251, long: -73.9855534, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7559406, long: -73.9821117, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7499427, long: -73.9909421, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7564592, long: -73.9845479, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7559406, long: -73.9821117, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7571560, long: -73.9848030, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7567555, long: -73.9843377, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7564251, long: -73.9855534, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7572369, long: -73.9844131, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7571560, long: -73.9848030, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7588950, long: -73.9851310, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7574214, long: -73.9838645, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7564316, long: -73.9842868, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7554202, long: -73.9823776, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
  { lat: 40.7574214, long: -73.9838645, uid: 'fb51dda0-7d79-11e6-b7b8-91cadaa7e29e' },
]


let ping = (data) => {
  let reqs = []
  data.forEach((stop) => {
    let url = 'http://localhost:7070/pingData?lat=' + stop.lat + '&long=' + stop.long + '&uid=' + stop.uid
    console.log(url)
    reqs.push(request(url))
  })
  return Promise.all(reqs)
}

ping(data)
.then((res) => {
  console.log(res)
})
.catch((err) => {
  console.log(err)
})

