import sports

giants = sports.get_team(sports.FOOTBALL, 'giants')
jets = sports.get_team(sports.FOOTBALL, 'jets')
devils = sports.get_team(sports.HOCKEY, 'devils')

teams = [{'name': devils.name, 'link': 'https://www.nhl.com/devils/', 'record': devils.record, 'won': '3'},
         {'name': giants.name, 'link': 'https://www.giants.com/', 'record': giants.record, 'won': '8'},
         {'name': jets.name, 'link': 'https://www.newyorkjets.com/', 'record': jets.record, 'won': '1'},
         {'name': 'Red Bulls', 'link': 'https://www.newyorkredbulls.com/', 'record': '5-11-0', 'won': '5'},
         {'name': 'NJ Jackals', 'link': 'http://njjackals.pointstreaksites.com/view/njjackals', 'record': '62-27', 'won': '10'}]


def sendInfo():
    return teams
