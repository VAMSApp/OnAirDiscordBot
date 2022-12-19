import {
    Ferry,
    Company,
    VirtualAirline,
    Employee,
    NewEmployee,
} from "."

export type Account = {
    Id:               string  
    DiscordId:        string  
    Username:         string  
    Discriminator:    string
    Locale:           string  
    Email?:            string 
    Verified?:         boolean 
    IsOnAirLinked?:    boolean 
    IsAdmin:          boolean  
    IsEnabled:        boolean  
    LastLogin?:        Date
    CreatedAt:        Date  
    UpdatedAt?:        Date 
    ApprovalToken?:    string
    ApprovedById?:     string
    EmployeeId?:       string 
    ApprovedAt?:       Date
    ApprovedBy?:       Account 
    Employee?:         Employee 
    Approvals?:        Account[]
    FerriesCompleted?: Ferry[]
    Company?:        Company
    VirtualAirlines?:  VirtualAirline[]
    Ferry?:            Ferry[]
}

export type NewAccount = { 
    DiscordId:        string 
    Username:         string 
    Discriminator:    string
    IsAdmin:          boolean 
    IsEnabled:        boolean
    IsOnAirLinked?:    boolean 
    Locale?:           string 
    ApprovalToken?:    string
    ApprovedById?:     string
    EmployeeId?:       string
    Email?:            string
    ApprovedAt?:       Date
    LastLogin?:        Date
    UpdatedAt?:        Date
    Employee?: any
}
  