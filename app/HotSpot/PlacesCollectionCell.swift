//
//  PlacesCollectionCell.swift
//  HotSpot
//
//  Created by Sazan Dauti on 9/18/16.
//  Copyright © 2016 Sazan Dauti. All rights reserved.
//

import UIKit

class PlacesCollectionCell: UICollectionViewCell {
    
    let bgImg: UIImageView = UIImageView()
    
    let placeName: UILabel = UILabel()
    let detTxt: UILabel = UILabel()
    let levelImg: UIImageView = UIImageView()
    
    override func layoutSubviews() {
        bgImg.frame = CGRect(x: 0, y: 0, width: self.frame.size.width, height: self.frame.size.height)
        bgImg.contentMode = .scaleAspectFill
        
        placeName.frame = CGRect(x: 5, y: 80, width: self.frame.size.width-10, height: 20)
        placeName.textAlignment = .center
        placeName.font = UIFont(name: "HelveticaNeue", size: 18.0)
        placeName.textColor = UIColor.white
        
        detTxt.frame = CGRect(x: 5, y: 110, width: self.frame.size.width-10, height: 20)
        detTxt.textAlignment = .center
        detTxt.font = UIFont(name: "HelveticaNeue-Light", size: 14.0)
        detTxt.textColor = UIColor.white
        
        levelImg.frame = CGRect(x: 0, y: 160, width: self.frame.size.width, height: 15)
        levelImg.contentMode = .scaleAspectFit
        
        
        let bgOverlay: UIView = UIView(frame: CGRect(x: 0, y: 0, width: self.frame.size.width, height: self.frame.size.height))
        bgOverlay.backgroundColor = UIColor.black
        bgOverlay.layer.opacity = 0.4
        
        self.addSubview(bgImg)
        self.addSubview(bgOverlay)
        self.addSubview(placeName)
        self.addSubview(detTxt)
        self.addSubview(levelImg)
    }
    
}
