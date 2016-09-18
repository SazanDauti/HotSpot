//
//  PlaceCell.swift
//  HotSpot
//
//  Created by Sazan Dauti on 9/18/16.
//  Copyright © 2016 Sazan Dauti. All rights reserved.
//

import UIKit

class PlaceCell: UITableViewCell {
    
    let imgPreview: UIImageView = UIImageView()
    let placeName: UILabel = UILabel()

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
    override func layoutSubviews() {
        imgPreview.frame = CGRect(x: 10, y: 15, width: 50, height: 50)
        imgPreview.layer.cornerRadius = 50
        imgPreview.contentMode = .scaleAspectFill
        
        placeName.frame = CGRect(x: 70, y: 20, width: self.frame.size.width-100, height: 40)
        placeName.font = UIFont(name: "HelveticaNeue", size: 16.0)
        placeName.textColor = UIColor(hexString: "#333333")
        
        self.addSubview(placeName)
        
        self.addSubview(imgPreview)
        
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
