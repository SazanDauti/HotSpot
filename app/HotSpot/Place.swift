//
//  Places.swift
//  HotSpot
//
//  Created by Sazan Dauti on 9/18/16.
//  Copyright © 2016 Sazan Dauti. All rights reserved.
//

import Foundation


struct Place {
    let name: String
    let imageUrl: String
    let hotness: Int
    let address: String
    let latitude: Double
    let longitude: Double
    
    var links: [Place] = []
}
