require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const sequelize = require('../src/config/database');
const bcrypt = require('bcryptjs');
const { User, Region, ProductCatalog, Facility, LogisticsRoute, Assessment, AssessmentImage, AssessmentDetail, ActivityLog, ForecastResult, SustainabilityScore, Recommendation } = require('../src/models');

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database reset & synced');

    // Regions
    const regions = await Region.bulkCreate([
      { name: 'Coimbatore', type: 'city' },
      { name: 'Chennai', type: 'city' },
      { name: 'Salem', type: 'city' },
      { name: 'Trichy', type: 'city' },
      { name: 'Kochi', type: 'city' },
      { name: 'Madurai', type: 'city' },
      { name: 'Tamil Nadu', type: 'state' },
      { name: 'Kerala', type: 'state' },
    ]);
    console.log(`Created ${regions.length} regions`);

    // Users
    const hash = await bcrypt.hash('password', 10);
    const adminHash = await bcrypt.hash('Admin@123', 10);
    const rootHash = await bcrypt.hash('root@123', 10);

    const users = await User.bulkCreate([
      { username: 'root', email: 'root@greenera.com', password_hash: rootHash, full_name: 'Root User', phone: '9876543210', role: 'root', region_id: 1 },
      { username: 'admin', email: 'admin@greenera.com', password_hash: adminHash, full_name: 'Super Admin', phone: '9876543211', role: 'admin', region_id: 1 },
      { username: 'admin_tn', email: 'admin.tn@greenera.com', password_hash: adminHash, full_name: 'Tamil Nadu Admin', phone: '9876543212', role: 'admin', region_id: 7 },
      { username: 'admin_kl', email: 'admin.kl@greenera.com', password_hash: adminHash, full_name: 'Kerala Admin', phone: '9876543213', role: 'admin', region_id: 8 },
      { username: 'center_chennai', email: 'chennai@greenera.com', password_hash: hash, full_name: 'Chennai Center Manager', phone: '9876543214', role: 'center_manager', region_id: 2 },
      { username: 'center_salem', email: 'salem@greenera.com', password_hash: hash, full_name: 'Salem Center Manager', phone: '9876543215', role: 'center_manager', region_id: 3 },
      { username: 'center_trichy', email: 'trichy@greenera.com', password_hash: hash, full_name: 'Trichy Center Manager', phone: '9876543216', role: 'center_manager', region_id: 4 },
      { username: 'center_kochi', email: 'kochi@greenera.com', password_hash: hash, full_name: 'Kochi Center Manager', phone: '9876543217', role: 'center_manager', region_id: 5 },
      { username: 'employee', email: 'employee@greenera.com', password_hash: adminHash, full_name: 'Staff User', phone: '9876543218', role: 'employee', region_id: 2 },
      { username: 'emp_priya', email: 'priya@greenera.com', password_hash: hash, full_name: 'Priya Sharma', phone: '9876543219', role: 'employee', region_id: 2 },
      { username: 'emp_ravi', email: 'ravi@greenera.com', password_hash: hash, full_name: 'Ravi Kumar', phone: '9876543220', role: 'employee', region_id: 3 },
      { username: 'emp_sneha', email: 'sneha@greenera.com', password_hash: hash, full_name: 'Sneha Patel', phone: '9876543221', role: 'employee', region_id: 5 },
      { username: 'emp_arun', email: 'arun@greenera.com', password_hash: hash, full_name: 'Arun Raj', phone: '9876543222', role: 'employee', region_id: 4 },
    ]);
    console.log(`Created ${users.length} users`);

    // Product Catalog
    const products = await ProductCatalog.bulkCreate([
      { name: 'Television', category: 'Home Appliance', icon: 'tv', base_price: 5000 },
      { name: 'Air Conditioner', category: 'Home Appliance', icon: 'ac', base_price: 8000 },
      { name: 'Refrigerator', category: 'Home Appliance', icon: 'fridge', base_price: 7000 },
      { name: 'Washing Machine', category: 'Home Appliance', icon: 'washing-machine', base_price: 4500 },
      { name: 'Fan', category: 'Home Appliance', icon: 'fan', base_price: 800 },
      { name: 'Laptop', category: 'Electronics', icon: 'laptop', base_price: 12000 },
      { name: 'Mobile', category: 'Electronics', icon: 'mobile', base_price: 5000 },
      { name: 'Monitor', category: 'Electronics', icon: 'monitor', base_price: 3000 },
      { name: 'Keyboard', category: 'Accessories', icon: 'keyboard', base_price: 300 },
      { name: 'Mouse', category: 'Accessories', icon: 'mouse', base_price: 150 },
    ]);
    console.log(`Created ${products.length} product types`);

    // Facilities
    const facilities = await Facility.bulkCreate([
      { name: 'Coimbatore HQ', type: 'collection_center', region_id: 1, capacity: 5000, rent: 150000, electricity_cost: 45000, staff_cost: 200000 },
      { name: 'Chennai Collection Center', type: 'collection_center', region_id: 2, capacity: 3000, rent: 100000, electricity_cost: 35000, staff_cost: 150000 },
      { name: 'Salem Collection Center', type: 'collection_center', region_id: 3, capacity: 2000, rent: 60000, electricity_cost: 20000, staff_cost: 100000 },
      { name: 'Trichy Collection Center', type: 'collection_center', region_id: 4, capacity: 2000, rent: 55000, electricity_cost: 18000, staff_cost: 90000 },
      { name: 'Kochi Collection Center', type: 'collection_center', region_id: 5, capacity: 2500, rent: 80000, electricity_cost: 25000, staff_cost: 120000 },
      { name: 'Coimbatore Processing Hub', type: 'preprocessing_unit', region_id: 1, capacity: 10000, rent: 300000, electricity_cost: 80000, staff_cost: 350000 },
      { name: 'Chennai Dismantling Unit', type: 'dismantling', region_id: 2, capacity: 4000, rent: 120000, electricity_cost: 40000, staff_cost: 180000 },
    ]);
    console.log(`Created ${facilities.length} facilities`);

    // Logistics Routes
    const routes = await LogisticsRoute.bulkCreate([
      { route_name: 'Chennai - Coimbatore', origin_facility_id: 2, destination_facility_id: 6, distance_km: 510, fuel_cost: 25000, driver_salary: 8000, vehicle_cost: 15000, maintenance_cost: 5000 },
      { route_name: 'Salem - Coimbatore', origin_facility_id: 3, destination_facility_id: 6, distance_km: 160, fuel_cost: 8000, driver_salary: 4000, vehicle_cost: 5000, maintenance_cost: 2000 },
      { route_name: 'Trichy - Coimbatore', origin_facility_id: 4, destination_facility_id: 6, distance_km: 260, fuel_cost: 13000, driver_salary: 5000, vehicle_cost: 8000, maintenance_cost: 3000 },
      { route_name: 'Kochi - Coimbatore', origin_facility_id: 5, destination_facility_id: 6, distance_km: 200, fuel_cost: 10000, driver_salary: 4500, vehicle_cost: 6000, maintenance_cost: 2500 },
      { route_name: 'Chennai - Salem', origin_facility_id: 2, destination_facility_id: 3, distance_km: 350, fuel_cost: 17000, driver_salary: 6000, vehicle_cost: 10000, maintenance_cost: 3500 },
    ]);
    console.log(`Created ${routes.length} logistics routes`);

    // Assessments (sample data)
    const brands = ['Samsung', 'LG', 'Sony', 'Whirlpool', 'Dell', 'HP', 'Apple', 'OnePlus', 'Lenovo', 'Panasonic'];
    const models = ['UE43TU7100', 'OLED55C1', 'XBR65X90J', 'WM3400CW', 'Inspiron 15', 'Pavilion 14', 'iPhone 14', 'Nord CE3', 'ThinkPad X1', 'TH-50GX700'];
    const conditions = ['excellent', 'good', 'fair', 'poor', 'damaged'];
    const classifications = ['reusable', 'repairable', 'recyclable', 'scrap'];

    const assessmentData = [];
    for (let i = 0; i < 50; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const user = users[Math.floor(Math.random() * 5) + 8];
      const conditionVal = conditions[Math.floor(Math.random() * conditions.length)];
      const classVal = classifications[Math.floor(Math.random() * classifications.length)];
      const statusVal = Math.random() > 0.2 ? 'completed' : (Math.random() > 0.5 ? 'draft' : 'in_progress');
      const daysAgo = Math.floor(Math.random() * 90);
      const createdDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

      assessmentData.push({
        user_id: user.id,
        customer_name: ['Rajesh Kumar', 'Priya Singh', 'Anand Murugan', 'Lakshmi Nair', 'Vikram Raj'][Math.floor(Math.random() * 5)],
        customer_email: `customer${i}@email.com`,
        customer_phone: `98765${String(40000 + i).slice(0, 5)}`,
        customer_address: `${Math.floor(Math.random() * 100) + 1}, ${['MG Road', 'Sathy Road', 'Avani Road', 'Marine Drive', 'Church Street'][Math.floor(Math.random() * 5)]}`,
        product_type_id: product.id,
        brand: brands[Math.floor(Math.random() * brands.length)],
        model: models[Math.floor(Math.random() * models.length)],
        year_of_manufacture: 2015 + Math.floor(Math.random() * 9),
        condition: conditionVal,
        weight_kg: Math.floor(Math.random() * 30) + 2,
        notes: [null, 'Minor scratches', 'Screen working', 'Power cable missing', 'Fully functional'][Math.floor(Math.random() * 5)],
        status: statusVal,
        value_estimate: Math.floor(Math.random() * 15000) + 500,
        ai_score: Math.floor(Math.random() * 40) + 55,
        classification: statusVal === 'completed' ? classVal : null,
        submitted_at: statusVal === 'completed' ? createdDate : null,
        created_at: createdDate,
        updated_at: createdDate,
      });
    }
    const assessments = await Assessment.bulkCreate(assessmentData);
    console.log(`Created ${assessments.length} assessments`);

    // Activities
    const actionTypes = [
      'assessment_created', 'assessment_submitted', 'staff_created',
      'staff_updated', 'forecast_generated', 'data_imported',
    ];
    const activityData = [];
    for (let i = 0; i < 30; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const daysAgo = Math.floor(Math.random() * 30);
      activityData.push({
        user_id: user.id,
        action: actionTypes[Math.floor(Math.random() * actionTypes.length)],
        entity_type: ['assessment', 'staff', 'forecast'][Math.floor(Math.random() * 3)],
        entity_id: Math.floor(Math.random() * 50) + 1,
        metadata: { random: true },
        created_at: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
      });
    }
    await ActivityLog.bulkCreate(activityData);
    console.log(`Created ${activityData.length} activities`);

    // Forecast Results
    const forecastYears = [2025, 2026, 2027, 2028, 2029];
    const forecastData = [];
    regions.filter((r) => r.type === 'city').forEach((region) => {
      forecastYears.forEach((year, idx) => {
        forecastData.push({
          region_id: region.id,
          forecast_year: year,
          forecasted_waste: Math.floor(Math.random() * 10000) + 2000 + idx * 2000,
          growth_rate: parseFloat((Math.random() * 10 + 5).toFixed(1)),
          opportunity_score: Math.floor(Math.random() * 30) + 60,
          predicted_revenue: Math.floor(Math.random() * 50000000) + 10000000 + idx * 10000000,
        });
      });
    });
    await ForecastResult.bulkCreate(forecastData);
    console.log(`Created ${forecastData.length} forecast results`);

    // Sustainability Scores
    await SustainabilityScore.bulkCreate(
      regions.filter((r) => r.type === 'city').map((r) => ({
        region_id: r.id,
        score: Math.floor(Math.random() * 20) + 65,
        collection_efficiency: parseFloat((Math.random() * 20 + 70).toFixed(1)),
        recovery_rate: parseFloat((Math.random() * 20 + 60).toFixed(1)),
        transportation_efficiency: parseFloat((Math.random() * 15 + 70).toFixed(1)),
        facility_utilization: parseFloat((Math.random() * 20 + 65).toFixed(1)),
        calculated_at: new Date(),
      }))
    );
    console.log('Created sustainability scores');

    // Recommendations
    await Recommendation.bulkCreate([
      { type: 'new_center', title: 'Open Collection Center in Madurai', description: 'Southern Tamil Nadu is underserved. Opening a center in Madurai could increase collection by 25%.', feasibility: 'high', estimated_cost: 5000000, estimated_benefit: 15000000 },
      { type: 'new_unit', title: 'Add Preprocessing Unit in Kochi', description: 'Kerala region needs dedicated preprocessing to reduce transport costs.', feasibility: 'medium', estimated_cost: 8000000, estimated_benefit: 20000000 },
      { type: 'expansion', title: 'Expand Coimbatore Processing Hub', description: 'Current capacity at 85%. Expansion needed to handle forecasted growth.', feasibility: 'high', estimated_cost: 12000000, estimated_benefit: 35000000 },
      { type: 'logistics_optimization', title: 'Optimize Trichy-Coimbatore Route', description: 'Alternative route via Karur could reduce distance by 40 km.', feasibility: 'high', estimated_cost: 500000, estimated_benefit: 2000000 },
    ]);
    console.log('Created recommendations');

    console.log('\n=== SEEDING COMPLETE ===');
    console.log('Demo Credentials:');
    console.log('  Root:     root / root@123');
    console.log('  Admin:    admin / Admin@123');
    console.log('  Employee: employee / Admin@123');
    console.log(`  All seeded users: password = "password" (except root/admin/employee)`);
    console.log(`\nServer: http://localhost:${process.env.PORT || 5000}`);

  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
