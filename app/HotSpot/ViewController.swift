//
//  ViewController.swift
//  HotSpot
//
//  Created by Sazan Dauti on 9/17/16.
//  Copyright © 2016 Sazan Dauti. All rights reserved.
//

import UIKit
import CoreLocation
import Alamofire
import SwiftHEXColors
import SimpleAnimation
import NVActivityIndicatorView
import SwiftyJSON

class ViewController: UIViewController, CLLocationManagerDelegate, UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    
    
    @IBOutlet weak var colView: UICollectionView!
    //@IBOutlet weak var tableView: UITableView!
    
    let backgroundLoader: UIView = UIView()
    let contentContainer: UIView = UIView()
    let logoImg: UIImageView = UIImageView()
    let spinnerAnim: NVActivityIndicatorView = NVActivityIndicatorView(frame: CGRect())
    
    var locManager = CLLocationManager()
    var currentLocation = CLLocation()
    
    var places: [Place] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()

        colView.frame = CGRect(x: 0, y: 90, width: self.view.frame.size.width, height: self.view.frame.size.height-90)
        
    
        self.view.isUserInteractionEnabled = false
        // Do any additional setup after loading the view, typically from a nib.
        
        UIApplication.shared.statusBarStyle = .lightContent
        
        locManager.requestWhenInUseAuthorization()
        
        if (CLLocationManager.authorizationStatus() == CLAuthorizationStatus.authorizedWhenInUse || CLLocationManager.authorizationStatus() == CLAuthorizationStatus.authorizedAlways){
            currentLocation = locManager.location!
        }
    
        getData()
        homeAnimation()
        
        //let myTimer = Timer(timeInterval: 30.0, target: self, selector: #selector(ViewController.pingData), userInfo: nil, repeats: true)
        //RunLoop.main.add(myTimer, forMode: RunLoopMode.defaultRunLoopMode)
        
        
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        self.navigationController?.setNavigationBarHidden(false, animated: true)
    }
    override func viewWillAppear(_ animated: Bool) {
        self.navigationController?.setNavigationBarHidden(true, animated: true)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    private func locationManager(manager: CLLocationManager!, didChangeAuthorizationStatus status: CLAuthorizationStatus) {
        if status == .authorizedWhenInUse {
            locManager.startUpdatingLocation()
        }
    }
    
    private func locationManager(manager: CLLocationManager!, didUpdateLocations locations: [AnyObject]!) {
        if (locations.first as? CLLocation) != nil {
            locManager.stopUpdatingLocation()
        }
    }
    
    func getData() {
        //pingData()
        DispatchQueue.global().async {
            
            var longitude = self.currentLocation.coordinate.longitude
            var latitude = self.currentLocation.coordinate.latitude
            
            //TEST DATA
            latitude = 40.758030
            longitude = -73.983630
            
            let url = "http://mcgruber.xyz/getArea?lat=\(latitude)&long=\(longitude)"
            Alamofire.request(url, method: .get).validate().responseJSON { response in
                switch response.result {
                case .success:
                    if let value = response.result.value {
                        let json = JSON(value)
                        
                        for (_, m) in json {
                            
                            var name = ""
                            var image = ""
                            var hotness = 0
                            var address = ""
                            var latitude: Double = 0
                            var longitude: Double = 0
                            
                            if m["name"].string != nil {
                                name = m["name"].string!
                            }
                            
                            if m["image"].string != nil {
                                image = m["image"].string!
                            }
                            
                            
                            if m["hotness"].int != nil {
                                hotness = m["hotness"].int!
                                hotness = Int(ceil(Double(hotness)/5))
                                if hotness == 0 {
                                    hotness = 1
                                } else if hotness > 5 {
                                    hotness = 5
                                }
                                
                            }
                            
                            if m["address"].string != nil {
                                address = m["address"].string!
                            }
                            
                            if m["latitude"].string != nil {
                                latitude = m["latitude"].double!
                                print(latitude)
                            }
                            
                            if m["longitude"].string != nil {
                                longitude = m["longitude"].double!
                                print(longitude)
                            }
                            
                            var tempPlace = Place(name: name, imageUrl: image, hotness: hotness, address: address, latitude: latitude, longitude: longitude, links: [Place]())
                            
                            let te = m["links"]
                            for (_, s) in te {
                                if s["end"] != nil {
                                    let tempLink = s["end"]
                                    
                                    var linkName = ""
                                    var linkImage = ""
                                    var linkHotness = 0
                                    var linkAddress = ""
                                    var linkLatitude: Double = 0
                                    var linkLongitude: Double = 0
                                    
                                    if tempLink["name"].string != nil {
                                        linkName = tempLink["name"].string!
                                    }
                                    
                                    if tempLink["image"].string != nil {
                                        linkImage = tempLink["image"].string!
                                    }
                                    
                                    if tempLink["hotness"].int != nil {
                                        linkHotness = tempLink["hotness"].int!
                                        linkHotness = Int(ceil(Double(linkHotness)/5))
                                        if linkHotness == 0 {
                                            linkHotness = 1
                                        } else if linkHotness > 5 {
                                            linkHotness = 5
                                        }
                                    }
                                    
                                    if tempLink["address"].string != nil {
                                        linkAddress = tempLink["address"].string!
                                    }
                                    
                                    if tempLink["latitude"].string != nil {
                                        linkLatitude = tempLink["latitude"].double!
                                    }
                                    
                                    if tempLink["longitude"].string != nil {
                                        linkLongitude = tempLink["longitude"].double!
                                    }
                                    
                                    let tempLinkPlace = Place(name: linkName, imageUrl: linkImage, hotness: linkHotness, address: linkAddress, latitude: linkLatitude, longitude: linkLongitude, links: [Place]())
                                    
                                    tempPlace.links.append(tempLinkPlace)
                                }
                                //print(s["end"])
                            }
                            
                            
                            self.places.append(tempPlace)
                            
                        }
                        
                        self.doneLoadingData()
                        
                } case .failure(let error):
                    print(error)
                }
            }
            
        }
    }
    
    func pingData() {
        DispatchQueue.global().async {
            
            let longitude = self.currentLocation.coordinate.longitude
            let latitude = self.currentLocation.coordinate.latitude
            
            let deviceId = UIDevice.current.identifierForVendor!.uuidString
            
            let url = "http://mcgruber.xyz/pingData?uid=\(deviceId)&lat=\(latitude)&long=\(longitude)"
            //let url = "http://szntech.com/bc/eagleeats/get.php"
            Alamofire.request(url, method: .get).validate().responseJSON {response in
                switch response.result {
                case .success:
                    if let _ = response.result.value {
                        
                        
                    } case .failure(let error):
                        print(error)
                }
            }
        }

    }
    
    func homeAnimation() {
        backgroundLoader.frame = CGRect(x: 0, y: 0, width: view.frame.size.width, height: view.frame.size.height)
        backgroundLoader.backgroundColor = UIColor(hexString: "#db433e")
        
        contentContainer.frame = CGRect(x: 0, y: (view.frame.size.height/2)-55, width: view.frame.size.width, height: 110)
        
        logoImg.frame = CGRect(x: 60, y: 0, width: view.frame.size.width-120, height: 60)
        logoImg.image = UIImage(named: "logo")
        logoImg.contentMode = .scaleAspectFit
        
        
        spinnerAnim.frame = CGRect(x: (view.frame.size.width/2)-50, y: 60, width: 100, height: 50)
        spinnerAnim.type = .ballPulse
        spinnerAnim.color = UIColor.white
        spinnerAnim.startAnimating()
        
        contentContainer.addSubview(logoImg)
        contentContainer.addSubview(spinnerAnim)
        
        backgroundLoader.addSubview(contentContainer)
        view.addSubview(backgroundLoader)
        
        _ = logoImg.popIn(delay: 0.0)
        _ = spinnerAnim.bounceIn(delay: 0.6)
    }
    
    func doneLoadingData() {
        colView.reloadData()
        UIView.animate(withDuration: 0.5, animations: ({
            self.spinnerAnim.layer.opacity = 0.0
        }), completion: { finish in
            self.spinnerAnim.removeFromSuperview()
            UIView.animate(withDuration: 0.5, delay: 1.0, usingSpringWithDamping: 1.0, initialSpringVelocity: 30, options: .curveLinear, animations: ({
                    self.backgroundLoader.frame = CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: 110)
                    self.contentContainer.frame = CGRect(x: 0, y: 50, width: self.view.frame.size.width, height: 60)
                    self.logoImg.frame = CGRect(x: 60, y: 0, width: self.view.frame.size.width-120, height: 40)
                    self.backgroundLoader.layer.shadowOpacity = 0.3
                    self.backgroundLoader.layer.shadowRadius = 1.0
                    self.backgroundLoader.layer.shadowColor = UIColor.black.cgColor
                    self.backgroundLoader.layer.shadowOffset = CGSize(width:0, height:1)
                    }), completion: { finish in
                        self.view.isUserInteractionEnabled = true
                    })
            })
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return places.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cell", for: indexPath) as! PlacesCollectionCell
        
        cell.placeName.text = places[indexPath.row].name
        cell.detTxt.text = places[indexPath.row].address
        
        let theNum = places[indexPath.row].hotness
        cell.levelImg.image = UIImage(named: "level\(theNum)")
        
        getDataFromUrl(url: URL(string: places[indexPath.row].imageUrl)!) { (data, response, error)  in
            DispatchQueue.main.sync() { () -> Void in
                guard let data = data, error == nil else { return }
                cell.bgImg.image = UIImage(data: data)
            }
        }
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: view.frame.size.width/2-2, height: view.frame.size.width/2-2)
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        self.performSegue(withIdentifier: "goToPlace", sender: indexPath)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if  segue.identifier == "goToPlace" {
            let indexPaths = self.colView!.indexPathsForSelectedItems!
            let indexPath = indexPaths[0] as NSIndexPath
            let vc = segue.destination as! PlaceViewController

            vc.simPlaces = places[indexPath.row].links
            vc.photoLink = places[indexPath.row].imageUrl
            vc.placeName = places[indexPath.row].name
            vc.latitude = places[indexPath.row].latitude
            vc.longitude = places[indexPath.row].longitude
        }
    }
    
    func getDataFromUrl(url: URL, completion: @escaping (_ data: Data?, _  response: URLResponse?, _ error: Error?) -> Void) {
        URLSession.shared.dataTask(with: url) {
            (data, response, error) in
            completion(data, response, error)
            }.resume()
    }
    
}

