#!/usr/bin/env node
// cli.js
const { program } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const pakistaniCities = require('./index');

program
  .version('1.0.1')
  .description('CLI for Pakistani Cities Information');

// List all cities
program
  .command('list')
  .description('List all cities')
  .option('-p, --province <province>', 'Filter by province')
  .option('-s, --sort <field>', 'Sort by field (name, population)')
  .action((options) => {
    let cities = pakistaniCities.getAllCities();
    
    if (options.province) {
      cities = pakistaniCities.getCitiesByProvince(options.province);
    }
    
    if (options.sort) {
      cities.sort((a, b) => {
        if (a[options.sort] < b[options.sort]) return -1;
        if (a[options.sort] > b[options.sort]) return 1;
        return 0;
      });
    }
    
    console.log(chalk.blue.bold('\n🇵🇰 Pakistani Cities\n'));
    cities.forEach(city => {
      const capitalMark = city.capital ? '⭐ ' : '';
      console.log(`${capitalMark}${chalk.green(city.name)} - ${chalk.yellow(city.province)} (Pop: ${city.population.toLocaleString()})`);
    });
    console.log(chalk.gray(`\nTotal: ${cities.length} cities`));
  });

// List all provinces
program
  .command('provinces')
  .description('List all provinces')
  .action(() => {
    const provinces = pakistaniCities.getProvinces();
    console.log(chalk.blue.bold('\n🇵🇰 Provinces of Pakistan\n'));
    provinces.forEach(province => {
      const citiesInProvince = pakistaniCities.getCitiesByProvince(province);
      console.log(`${chalk.green(province)} - ${chalk.yellow(citiesInProvince.length)} cities`);
    });
  });

// Search for a city
program
  .command('search <name>')
  .description('Search for a city by name')
  .action((name) => {
    const results = pakistaniCities.searchCityByName(name);
    if (results.length > 0) {
      console.log(chalk.blue.bold(`\n🔍 Search Results for "${name}":\n`));
      results.forEach(city => {
        const capitalMark = city.capital ? '⭐ ' : '';
        console.log(`${capitalMark}${chalk.green(city.name)} - ${chalk.yellow(city.province)} (Pop: ${city.population.toLocaleString()})`);
      });
    } else {
      console.log(chalk.red(`No cities found with name containing "${name}"`));
    }
  });

// Interactive mode
program
  .command('interactive')
  .description('Interactive mode')
  .action(async () => {
    const provinces = pakistaniCities.getProvinces();
    
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all cities',
          'View cities by province',
          'Search for a city',
          'View provinces',
          'Exit'
        ]
      }
    ]);

    switch (action) {
      case 'View all cities':
        const allCities = pakistaniCities.getAllCities();
        console.log(chalk.blue.bold('\n🇵🇰 All Pakistani Cities\n'));
        allCities.forEach(city => {
          const capitalMark = city.capital ? '⭐ ' : '';
          console.log(`${capitalMark}${chalk.green(city.name)} - ${chalk.yellow(city.province)}`);
        });
        break;

      case 'View cities by province':
        const { selectedProvince } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedProvince',
            message: 'Select a province:',
            choices: provinces
          }
        ]);
        
        const provinceCities = pakistaniCities.getCitiesByProvince(selectedProvince);
        console.log(chalk.blue.bold(`\n🏙️  Cities in ${selectedProvince}\n`));
        provinceCities.forEach(city => {
          const capitalMark = city.capital ? '⭐ ' : '';
          console.log(`${capitalMark}${chalk.green(city.name)} (Pop: ${city.population.toLocaleString()})`);
        });
        break;

      case 'Search for a city':
        const { searchTerm } = await inquirer.prompt([
          {
            type: 'input',
            name: 'searchTerm',
            message: 'Enter city name to search:'
          }
        ]);
        
        const searchResults = pakistaniCities.searchCityByName(searchTerm);
        if (searchResults.length > 0) {
          console.log(chalk.blue.bold(`\n🔍 Search Results:\n`));
          searchResults.forEach(city => {
            console.log(`${chalk.green(city.name)} - ${chalk.yellow(city.province)}`);
          });
        } else {
          console.log(chalk.red('No cities found'));
        }
        break;

      case 'View provinces':
        console.log(chalk.blue.bold('\n🇵🇰 Provinces of Pakistan\n'));
        provinces.forEach(province => {
          const citiesCount = pakistaniCities.getCitiesByProvince(province).length;
          console.log(`${chalk.green(province)} - ${citiesCount} cities`);
        });
        break;

      case 'Exit':
        console.log(chalk.yellow('Goodbye!'));
        process.exit(0);
    }
  });

program.parse(process.argv);