//
//  PlaceViewController.swift
//  HotSpot
//
//  Created by Sazan Dauti on 9/18/16.
//  Copyright © 2016 Sazan Dauti. All rights reserved.
//

import UIKit
import SwiftHEXColors

class PlaceViewController: UIViewController {
    
    var placeName: String = String()
    var placeAddress: String = String()
    
    var newImgNav: UIView = UIView()
    
    var photo: UIImageView = UIImageView()
    var photoLink: String = String()
    
    var longitude: Double = Double()
    var latitude: Double = Double()
    
    var simPlaces: [Place] = []
    
    //var colorArr = [UIColor(hexString: "#57d68d"), UIColor(hexString: "#5cace2"), UIColor(hexString: "#e67e22")]

    var colorArr = [UIColor(hexString: "#f7f7f7")]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: .default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.isTranslucent = true
        self.navigationController?.navigationBar.tintColor = UIColor.init(hexString: "#ffffff")
        
        newImgNav.frame = CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: self.view.frame.size.height)
        newImgNav.backgroundColor = UIColor(hexString: "#db433e")
        self.view.addSubview(newImgNav)
        
        addDetail()
        addSim()

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func addDetail() {
        photo.frame = CGRect(x: self.view.frame.size.width/2-60, y: 50, width: 120, height: 120)
        photo.contentMode = .scaleAspectFill
        photo.clipsToBounds = true
        photo.layer.cornerRadius = photo.frame.size.width/2
        photo.layer.borderColor = UIColor.white.cgColor
        photo.layer.borderWidth = 7.0
        
        getDataFromUrl(url: URL(string: photoLink)!) { (data, response, error)  in
            DispatchQueue.main.sync() { () -> Void in
                guard let data = data, error == nil else { return }
                self.photo.image = UIImage(data: data)
            }
        }
        
        let nameLbl = UILabel(frame: CGRect(x: 15, y: 190, width: self.view.frame.width-30, height: 40))
        nameLbl.textAlignment = .center
        nameLbl.text = placeName
        nameLbl.font = UIFont(name: "HelveticaNeue", size: 22.0)
        nameLbl.textColor = UIColor.white
        nameLbl.layer.opacity = 0.9
        
        
        let dirButton = UIButton()
        dirButton.setTitle("Get Directions", for: .normal)
        dirButton.setTitleColor(UIColor(hexString: "#db433e"), for: .normal)
        dirButton.layer.cornerRadius = 4.0
        dirButton.backgroundColor = UIColor(hexString: "#f8f8f8")
        dirButton.frame = CGRect(x: 30, y: 260, width: self.view.frame.size.width-60, height: 50)
        dirButton.addTarget(self, action: #selector(pressed), for: .touchUpInside)
        self.view.addSubview(dirButton)
        
        
        self.view.addSubview(nameLbl)
        self.view.addSubview(photo)
    }
    
    func pressed(sender: UIButton!) {
        UIApplication.shared.openURL(NSURL(string: "http://maps.apple.com/?ll=\(latitude),\(longitude)")! as URL)
    }
    
    
    
    func addSim() {
        for i in 0 ..< simPlaces.count {
            print(i)
            let tempTab = UIView(frame: CGRect(x: 0, y: self.view.frame.size.height-CGFloat(100*(i+1)), width: self.view.frame.size.width, height: 100))
            tempTab.backgroundColor = colorArr[i % colorArr.count]
            tempTab.layer.shadowOpacity = 0.1
            tempTab.layer.shadowRadius = 0.1
            tempTab.layer.shadowColor = UIColor.black.cgColor
            tempTab.layer.shadowOffset = CGSize(width:0, height:1)
            
            let imagePrev = UIImageView(frame: CGRect(x: 15, y: 15, width: 70, height: 70))
        
            getDataFromUrl(url: URL(string: simPlaces[i].imageUrl)!) { (data, response, error)  in
                DispatchQueue.main.sync() { () -> Void in
                    guard let data = data, error == nil else { return }
                    imagePrev.image = UIImage(data: data)
                }
            }
            
            imagePrev.layer.cornerRadius = imagePrev.frame.size.width/2
            imagePrev.contentMode = .scaleAspectFill
            imagePrev.clipsToBounds = true
            imagePrev.layer.borderColor = UIColor.white.cgColor
            imagePrev.layer.borderWidth = 5.0
            
            let tempName = UILabel(frame: CGRect(x: 100, y: 0, width: self.view.frame.size.width-200, height: 100))
            tempName.text = simPlaces[i].name
            tempName.font = UIFont(name: "HelveticaNeue", size: 18.0)
            tempName.textColor = UIColor.black
            tempName.layer.opacity = 0.8
            
            
            let hotnessImg = UIImageView(frame: CGRect(x: self.view.frame.size.width-65, y: 0, width: 50, height: 100))
            hotnessImg.contentMode = .scaleAspectFit
            hotnessImg.image = UIImage(named: "level\(simPlaces[i].hotness)")
            
            tempTab.addSubview(hotnessImg)
            tempTab.addSubview(tempName)
            tempTab.addSubview(imagePrev)
            
            var gesture = UITapGestureRecognizer()
            if i == 1 {
                gesture = UITapGestureRecognizer(target: self, action: #selector(clickButton1(sender:)))
            } else if i == 2 {
                gesture = UITapGestureRecognizer(target: self, action: #selector(clickButton2(sender:)))
            } else if i == 3 {
                gesture = UITapGestureRecognizer(target: self, action: #selector(clickButton3(sender:)))
            }
            
            tempTab.addGestureRecognizer(gesture)
            
            self.view.addSubview(tempTab)
        }
        
        let headerBar = UIView(frame: CGRect(x: 0, y: self.view.frame.size.height-CGFloat(100*(simPlaces.count)+50), width: self.view.frame.size.width, height: 50))
        headerBar.backgroundColor = UIColor(hexString: "#fbfbfb")
        
        headerBar.layer.shadowOpacity = 0.1
        headerBar.layer.shadowRadius = 1.0
        headerBar.layer.shadowColor = UIColor.black.cgColor
        headerBar.layer.shadowOffset = CGSize(width:0, height:1)
        
        let headerBarTitle = UILabel(frame: CGRect(x: 10, y: 0, width: self.view.frame.width-20, height: 50))
        headerBarTitle.text = "Other places to go"
        headerBarTitle.font = UIFont(name: "HelveticaNeue", size: 16.0)
        headerBarTitle.textColor = UIColor.black
        headerBarTitle.layer.opacity = 0.5
        
        headerBar.addSubview(headerBarTitle)
        
        self.view.addSubview(headerBar)
    }
    
    func clickButton1(sender:UITapGestureRecognizer) {
        UIApplication.shared.openURL(NSURL(string: "http://maps.apple.com/?ll=\(simPlaces[0].latitude),\(simPlaces[0].longitude)")! as URL)
    }
    
    func clickButton2(sender:UITapGestureRecognizer) {
        UIApplication.shared.openURL(NSURL(string: "http://maps.apple.com/?ll=\(simPlaces[1].latitude),\(simPlaces[1].longitude)")! as URL)
    }
    
    func clickButton3(sender:UITapGestureRecognizer) {
        UIApplication.shared.openURL(NSURL(string: "http://maps.apple.com/?ll=\(simPlaces[2].latitude),\(simPlaces[2].longitude)")! as URL)
    }
    
    func getDataFromUrl(url: URL, completion: @escaping (_ data: Data?, _  response: URLResponse?, _ error: Error?) -> Void) {
        URLSession.shared.dataTask(with: url) {
            (data, response, error) in
            completion(data, response, error)
            }.resume()
    }
    

}
