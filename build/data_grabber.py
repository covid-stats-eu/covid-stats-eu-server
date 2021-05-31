import urllib.request, json
import country_converter as coco
import os

CASES_DEATHS_LINK = "https://opendata.ecdc.europa.eu/covid19/nationalcasedeath/json/"
TESTS_LINK = "https://opendata.ecdc.europa.eu/covid19/testing/json/"

#main
print("(1/6) fetching cases/deaths...")
with urllib.request.urlopen(CASES_DEATHS_LINK) as url:
    countries_data = json.loads(url.read().decode())
print("Done (1/6).")

print("(2/6) create data for country and death cases for activity...")
countries = []
activities = []
for country_data in countries_data:
    # keep only europe counties without total
    if not ("country_code" in country_data and country_data["continent"] == "Europe"):
        continue

    country_stored = False
    activity_stored = False
    # check if country is already stored in memory
    for country in countries:
        if country_data["country_code"] == country["code"]:
            country_stored = True
    # if country is not stored in memory yet, just do it 
    if not country_stored:
        countries.append({ 
            "name": country_data["country"],
            "code": country_data["country_code"],
            "population": country_data["population"],
        })
    
    # check if country is already stored in memory
    for index, activity in enumerate(activities):
        if activity["code"] == country_data["country_code"] and activity["year_week"] == country_data["year_week"]:
            activity_stored = True
            break
    if not activity_stored:
        activities.append({
            "name": country_data["country"],
            "code": country_data["country_code"],
            "year_week": country_data["year_week"],
        })
        index = -1 # change index to last item

    if country_data["indicator"] == "cases": 
        activities[index]["cases"] = country_data["weekly_count"]
    elif country_data["indicator"] == "deaths":
        activities[index]["deaths"] = country_data["weekly_count"]
print("Done (2/6)")

print("(3/6) fetching tests...")
with urllib.request.urlopen(TESTS_LINK) as url:
    countries_data = json.loads(url.read().decode())
print("Done (3/6).")

print("(4/6) create data for tests for activity...")
for country_data in countries_data:
    activity_stored = False
    country_data["year_week"] = country_data["year_week"].replace('W', '')
    # keep only europe counties without total
    if not "country_code" in country_data:
        continue
    for index, activity in enumerate(activities):
        if activity["name"] == country_data["country"] and activity["year_week"] == country_data["year_week"]:
            activity_stored = True
            break

    if not activity_stored:
        activities.append({
            "name": country_data["country"],
            "code": coco.convert(names=country_data["country_code"], to='iso3'),
            "year_week": country_data["year_week"],
        })
        index = -1 # change index to last item

    activities[index]["tests"] = country_data["tests_done"]
print("Done (4/6).")

# this is optional
# countries = sorted(countries, key = lambda i: i['name']) 
# activities = sorted(activities, key = lambda i: (i['code'], i['year_week'] ))

print("(5/6) write country.sql...")
with open('country.sql', 'w') as f:  
    print("INSERT INTO country (code, name, population) VALUES ", file=f)
    for country in countries:
        f.write(
            "(" +
            "'" + country["code"] + "', " +
            "'" + country["name"] + "', " +
            "'" + str(country["population"]) + "'), \n"
        )
    f.seek(f.tell() -3, os.SEEK_SET)
    f.write(';')
print("Done (5/6).")

print("(6/6) write activity.sql...")
with open('activity.sql', 'w+') as f:  
    print("INSERT INTO activity (cases, deaths, tests, year_week, code) VALUES ", file=f) 
    for activity in activities:
        if not "cases" in activity:
            activity["cases"] = 0
        if not "deaths" in activity:
            activity["deaths"] = 0     
        if not "tests" in activity:
            activity["tests"] = 0          

        f.write(
            "(" +
            "'" + str(activity["cases"]) + "', " +
            "'" + str(activity["deaths"]) + "', " +
            "'" + str(activity["tests"]) + "', " +
            "'" + activity["year_week"] + "', " +
            "'" + activity["code"] + "'), \n",
        )
    f.seek(f.tell() -3, os.SEEK_SET)
    f.write(';')
print("Done (6/6).")

print("Done!")
