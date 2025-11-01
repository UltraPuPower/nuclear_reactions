def userReturnMenu():
    match input('Return to the main menu? Y/N: ').lower():
        case 'y':
            userCall()

def userCall():
    print('='*10+'[\u2623 Main Menu \u2623]'+'='*10)
    print('''Pick a tool you want to use
[1] - Odd rebalancer [Adjusts non full odds to be full]''')
    userChoice = input()
    match userChoice:
        case '1':
            print('='*10+'[Odd rebalancer]'+'='*10)
            rebalance()
        case _:
            print('invalid')
            userCall()


def rebalance():
    odd1 = float(input('Enter first odd: '))
    odd2 = float(input('Enter second odd: '))
    totalOddPartial = odd1 + odd2
    oddAdjustmentFactor = 100 / totalOddPartial
    newOdd1 = str(round(oddAdjustmentFactor*odd1, 2))
    newOdd2 = str(round(oddAdjustmentFactor*odd2, 2))
    print(f'Adjusted odds:\n- First odd: {newOdd1}%\n- Second odd: {newOdd2}%')
    match input('Repeat? Y/N: ').lower():
        case 'y':
            rebalance()
        case _:
            userReturnMenu()

print('Math toolkit - [mathScript.py]')
userCall()